/**
 * Error handling utilities
 * Following backend engineering principles: typed errors, proper logging
 */

export class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'ApplicationError'
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string = 'Kimlik doğrulama başarısız') {
    super(message, 'AUTHENTICATION_ERROR', 401)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string = 'Bu işlem için yetkiniz yok') {
    super(message, 'AUTHORIZATION_ERROR', 403)
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string = 'Kayıt bulunamadı') {
    super(message, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class RateLimitError extends ApplicationError {
  constructor(message: string = 'Çok fazla istek. Lütfen daha sonra tekrar deneyiniz.', public retryAfter?: number) {
    super(message, 'RATE_LIMIT_ERROR', 429)
    this.name = 'RateLimitError'
  }
}

export class NetworkError extends ApplicationError {
  constructor(message: string = 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol ediniz.') {
    super(message, 'NETWORK_ERROR', 0)
    this.name = 'NetworkError'
  }
}

/**
 * Parse Supabase errors into friendly messages
 */
export function parseSupabaseError(error: any): ApplicationError {
  // PostgreSQL error codes
  if (error.code) {
    switch (error.code) {
      case '23505': // unique_violation
        return new ValidationError('Bu kayıt zaten mevcut')
      case '23503': // foreign_key_violation
        return new ValidationError('İlişkili kayıt bulunamadı')
      case '23502': // not_null_violation
        return new ValidationError('Zorunlu alan boş bırakılamaz')
      case 'PGRST116': // No rows returned
        return new NotFoundError()
      case '42501': // insufficient_privilege
        return new AuthorizationError()
    }
  }

  // Supabase Auth errors
  if (error.message) {
    if (error.message.includes('Invalid login credentials')) {
      return new AuthenticationError('E-posta veya şifre hatalı')
    }
    if (error.message.includes('Email not confirmed')) {
      return new AuthenticationError('E-posta adresinizi onaylamanız gerekiyor')
    }
    if (error.message.includes('User already registered')) {
      return new ValidationError('Bu e-posta adresi zaten kayıtlı')
    }
  }

  // Network errors
  if (error.message?.includes('Failed to fetch') || error.message?.includes('Network')) {
    return new NetworkError()
  }

  // Default error
  return new ApplicationError(
    error.message || 'Bir hata oluştu',
    'UNKNOWN_ERROR',
    500
  )
}

/**
 * Format error for user display
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ApplicationError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Beklenmeyen bir hata oluştu'
}

/**
 * Log error (in production, send to error tracking service)
 */
export function logError(error: unknown, context?: Record<string, any>) {
  if (import.meta.env.DEV) {
    console.error('Error:', error, 'Context:', context)
  } else {
    // In production, send to error tracking service (e.g., Sentry)
    // sentry.captureException(error, { extra: context })
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number
    initialDelay?: number
    maxDelay?: number
    factor?: number
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    factor = 2,
  } = options

  let lastError: unknown
  let delay = initialDelay

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      // Don't retry on client errors (4xx)
      if (error instanceof ApplicationError && error.statusCode >= 400 && error.statusCode < 500) {
        throw error
      }

      // Last attempt, throw error
      if (attempt === maxAttempts) {
        throw error
      }

      // Wait before retry with jitter
      const jitter = Math.random() * 0.3 * delay
      await new Promise(resolve => setTimeout(resolve, delay + jitter))

      // Increase delay for next attempt
      delay = Math.min(delay * factor, maxDelay)
    }
  }

  throw lastError
}
