'use client'

import { useCallback } from 'react'

/**
 * Custom hook for Indonesian-specific formatting
 * Provides utilities for currency, dates, phone numbers, and text formatting
 */
export const useIndonesianFormat = () => {
  
  /**
   * Format currency in Indonesian Rupiah
   * @param amount - The amount to format
   * @param options - Additional formatting options
   */
  const formatCurrency = useCallback((
    amount: number,
    options?: {
      showSymbol?: boolean
      decimals?: number
      compact?: boolean
    }
  ): string => {
    const { showSymbol = true, decimals = 0, compact = false } = options || {}

    if (compact && amount >= 1000000000) {
      return `${showSymbol ? 'Rp ' : ''}${(amount / 1000000000).toFixed(1)}M`
    }
    if (compact && amount >= 1000000) {
      return `${showSymbol ? 'Rp ' : ''}${(amount / 1000000).toFixed(1)}jt`
    }
    if (compact && amount >= 1000) {
      return `${showSymbol ? 'Rp ' : ''}${(amount / 1000).toFixed(0)}rb`
    }

    return new Intl.NumberFormat('id-ID', {
      style: showSymbol ? 'currency' : 'decimal',
      currency: 'IDR',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(amount)
  }, [])

  /**
   * Format date in Indonesian format
   * @param date - Date to format
   * @param options - Formatting options
   */
  const formatDate = useCallback((
    date: Date | string,
    options?: {
      includeTime?: boolean
      relative?: boolean
      short?: boolean
    }
  ): string => {
    const { includeTime = false, relative = false, short = false } = options || {}
    const dateObj = typeof date === 'string' ? new Date(date) : date

    if (relative) {
      const now = new Date()
      const diff = now.getTime() - dateObj.getTime()
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if (days > 7) {
        return formatDate(dateObj, { short })
      }
      if (days > 0) return `${days} hari yang lalu`
      if (hours > 0) return `${hours} jam yang lalu`
      if (minutes > 0) return `${minutes} menit yang lalu`
      return 'Baru saja'
    }

    const formatOptions: Intl.DateTimeFormatOptions = short
      ? { day: 'numeric', month: 'short', year: 'numeric' }
      : { day: 'numeric', month: 'long', year: 'numeric' }

    if (includeTime) {
      formatOptions.hour = '2-digit'
      formatOptions.minute = '2-digit'
    }

    return new Intl.DateTimeFormat('id-ID', formatOptions).format(dateObj)
  }, [])

  /**
   * Format phone number for Indonesian format
   * @param phone - Phone number to format
   */
  const formatPhoneNumber = useCallback((phone: string): string => {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '')
    
    // Handle Indonesian phone numbers
    if (cleaned.startsWith('62')) {
      // +62 812 3456 7890
      const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})(\d{4})$/)
      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
      }
    } else if (cleaned.startsWith('0')) {
      // 0812-3456-7890
      const match = cleaned.match(/^(\d)(\d{3})(\d{4})(\d{4})$/)
      if (match) {
        return `${match[1]}${match[2]}-${match[3]}-${match[4]}`
      }
    }
    
    return phone
  }, [])

  /**
   * Format number with Indonesian thousand separators
   * @param num - Number to format
   */
  const formatNumber = useCallback((num: number): string => {
    return new Intl.NumberFormat('id-ID').format(num)
  }, [])

  /**
   * Format percentage
   * @param value - Value to format as percentage
   * @param decimals - Number of decimal places
   */
  const formatPercentage = useCallback((value: number, decimals: number = 0): string => {
    return `${value.toFixed(decimals)}%`
  }, [])

  /**
   * Format weight (grams to kg)
   * @param grams - Weight in grams
   */
  const formatWeight = useCallback((grams: number): string => {
    if (grams >= 1000) {
      const kg = grams / 1000
      return kg % 1 === 0 ? `${kg} kg` : `${kg.toFixed(1)} kg`
    }
    return `${grams} gram`
  }, [])

  /**
   * Format distance for delivery
   * @param meters - Distance in meters
   */
  const formatDistance = useCallback((meters: number): string => {
    if (meters >= 1000) {
      const km = meters / 1000
      return `${km.toFixed(1)} km`
    }
    return `${meters} meter`
  }, [])

  /**
   * Truncate text with ellipsis
   * @param text - Text to truncate
   * @param maxLength - Maximum length
   */
  const truncateText = useCallback((text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return `${text.substring(0, maxLength)}...`
  }, [])

  /**
   * Format social media handle
   * @param handle - Social media handle
   * @param platform - Platform type
   */
  const formatSocialHandle = useCallback((
    handle: string, 
    platform: 'tiktok' | 'instagram' | 'twitter' = 'tiktok'
  ): string => {
    const cleaned = handle.replace('@', '').trim()
    return `@${cleaned}`
  }, [])

  /**
   * Get greeting based on time of day
   */
  const getGreeting = useCallback((): string => {
    const hour = new Date().getHours()
    if (hour < 10) return 'Selamat pagi'
    if (hour < 15) return 'Selamat siang'
    if (hour < 18) return 'Selamat sore'
    return 'Selamat malam'
  }, [])

  return {
    formatCurrency,
    formatDate,
    formatPhoneNumber,
    formatNumber,
    formatPercentage,
    formatWeight,
    formatDistance,
    truncateText,
    formatSocialHandle,
    getGreeting
  }
}