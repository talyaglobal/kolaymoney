/**
 * Client-side rate limiting utility
 * Prevents excessive form submissions and API calls
 */

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  keyPrefix?: string
}

interface RateLimitEntry {
  count: number
  resetAt: number
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map()

  /**
   * Check if action is allowed under rate limit
   */
  check(key: string, config: RateLimitConfig): boolean {
    const fullKey = config.keyPrefix ? `${config.keyPrefix}:${key}` : key
    const now = Date.now()
    
    // Clean up expired entries
    this.cleanup()

    const entry = this.storage.get(fullKey)

    // No entry exists, allow and create new entry
    if (!entry) {
      this.storage.set(fullKey, {
        count: 1,
        resetAt: now + config.windowMs,
      })
      return true
    }

    // Entry expired, reset
    if (now >= entry.resetAt) {
      this.storage.set(fullKey, {
        count: 1,
        resetAt: now + config.windowMs,
      })
      return true
    }

    // Check if limit exceeded
    if (entry.count >= config.maxAttempts) {
      return false
    }

    // Increment count
    entry.count++
    this.storage.set(fullKey, entry)
    return true
  }

  /**
   * Get remaining attempts
   */
  getRemaining(key: string, config: RateLimitConfig): number {
    const fullKey = config.keyPrefix ? `${config.keyPrefix}:${key}` : key
    const entry = this.storage.get(fullKey)

    if (!entry || Date.now() >= entry.resetAt) {
      return config.maxAttempts
    }

    return Math.max(0, config.maxAttempts - entry.count)
  }

  /**
   * Get time until reset (in milliseconds)
   */
  getResetTime(key: string, config: RateLimitConfig): number {
    const fullKey = config.keyPrefix ? `${config.keyPrefix}:${key}` : key
    const entry = this.storage.get(fullKey)

    if (!entry) {
      return 0
    }

    const now = Date.now()
    return Math.max(0, entry.resetAt - now)
  }

  /**
   * Clean up expired entries
   */
  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.storage.entries()) {
      if (now >= entry.resetAt) {
        this.storage.delete(key)
      }
    }
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string, config: RateLimitConfig) {
    const fullKey = config.keyPrefix ? `${config.keyPrefix}:${key}` : key
    this.storage.delete(fullKey)
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

// Preset configurations
export const RATE_LIMITS = {
  // Form submissions: 3 attempts per 15 minutes
  FORM_SUBMISSION: {
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000,
    keyPrefix: 'form',
  },
  
  // Login attempts: 5 attempts per 15 minutes
  LOGIN: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000,
    keyPrefix: 'login',
  },
  
  // API calls: 10 attempts per minute
  API_CALL: {
    maxAttempts: 10,
    windowMs: 60 * 1000,
    keyPrefix: 'api',
  },
} as const

/**
 * Hook for rate limiting in React components
 */
export function useRateLimit(key: string, config: RateLimitConfig) {
  const check = () => rateLimiter.check(key, config)
  const getRemaining = () => rateLimiter.getRemaining(key, config)
  const getResetTime = () => rateLimiter.getResetTime(key, config)
  const reset = () => rateLimiter.reset(key, config)

  return {
    check,
    getRemaining,
    getResetTime,
    reset,
  }
}
