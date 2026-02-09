import { format as dateFnsFormat } from 'date-fns'

/**
 * Format currency in Turkish Lira
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num)
}

/**
 * Format date in Turkish locale
 */
export function formatDate(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateFnsFormat(dateObj, formatStr)
}

/**
 * Format datetime in Turkish locale
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateFnsFormat(dateObj, 'dd/MM/yyyy HH:mm')
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  // Remove +90 prefix if exists
  const cleaned = phone.replace(/^\+90/, '')
  
  // Format as 5XX XXX XX XX
  if (cleaned.length === 10) {
    return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`
  }
  
  return phone
}

/**
 * Format tax number for display
 */
export function formatTaxNumber(taxNumber: string): string {
  // Format as XXX-XXX-XXXX
  if (taxNumber.length === 10) {
    return `${taxNumber.slice(0, 3)}-${taxNumber.slice(3, 6)}-${taxNumber.slice(6)}`
  }
  
  return taxNumber
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Generate idempotency key for form submissions
 */
export function generateIdempotencyKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Clean and format phone number for submission
 */
export function cleanPhone(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')
  
  // Ensure it starts with +90
  if (!cleaned.startsWith('+90')) {
    if (cleaned.startsWith('90')) {
      return `+${cleaned}`
    }
    if (cleaned.startsWith('0')) {
      return `+90${cleaned.slice(1)}`
    }
    return `+90${cleaned}`
  }
  
  return cleaned
}

/**
 * Clean tax number for submission
 */
export function cleanTaxNumber(taxNumber: string): string {
  // Remove all non-digit characters
  return taxNumber.replace(/\D/g, '')
}
