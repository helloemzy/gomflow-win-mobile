'use client'

import { memo } from 'react'

interface PriceDisplayProps {
  amount: number
  originalAmount?: number
  currency?: 'IDR' | 'USD'
  showSavings?: boolean
  size?: 'small' | 'medium' | 'large' | 'xl'
  variant?: 'default' | 'sale' | 'discount'
  label?: string
}

/**
 * Indonesian-optimized price display component
 * - Formats IDR with proper thousand separators (Rp 150.000)
 * - Shows savings amount and percentage
 * - Visual hierarchy for promotional pricing
 */
const PriceDisplay = memo(({
  amount,
  originalAmount,
  currency = 'IDR',
  showSavings = true,
  size = 'medium',
  variant = 'default',
  label
}: PriceDisplayProps) => {
  
  // Indonesian number formatting
  const formatIDR = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatPrice = currency === 'IDR' ? formatIDR : formatUSD

  // Calculate discount percentage
  const discountPercent = originalAmount 
    ? Math.round((1 - amount / originalAmount) * 100)
    : 0

  const savingsAmount = originalAmount ? originalAmount - amount : 0

  // Size classes for different contexts
  const sizeClasses = {
    small: {
      current: 'text-lg font-semibold',
      original: 'text-sm',
      badge: 'text-xs px-2 py-0.5',
      label: 'text-xs'
    },
    medium: {
      current: 'text-2xl font-bold',
      original: 'text-base',
      badge: 'text-sm px-2.5 py-1',
      label: 'text-sm'
    },
    large: {
      current: 'text-3xl font-bold',
      original: 'text-lg',
      badge: 'text-base px-3 py-1.5',
      label: 'text-base'
    },
    xl: {
      current: 'text-4xl font-extrabold',
      original: 'text-xl',
      badge: 'text-lg px-4 py-2',
      label: 'text-lg'
    }
  }

  // Variant colors
  const variantColors = {
    default: 'text-amber-900',
    sale: 'text-red-600',
    discount: 'text-green-600'
  }

  const hasDiscount = originalAmount && originalAmount > amount

  return (
    <div className="inline-flex flex-col">
      {/* Discount badge */}
      {hasDiscount && variant !== 'default' && (
        <div className="mb-2">
          <span className={`
            inline-flex items-center rounded-full font-semibold
            ${variant === 'sale' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
            ${sizeClasses[size].badge}
          `}>
            HEMAT {discountPercent}%
          </span>
        </div>
      )}

      {/* Label */}
      {label && (
        <div className={`text-amber-600 mb-1 ${sizeClasses[size].label}`}>
          {label}
        </div>
      )}

      {/* Price container */}
      <div className="flex items-baseline gap-2 flex-wrap">
        {/* Current price */}
        <span className={`
          ${sizeClasses[size].current}
          ${variantColors[variant]}
        `}>
          {formatPrice(amount)}
        </span>

        {/* Original price */}
        {hasDiscount && (
          <span className={`
            line-through text-gray-500
            ${sizeClasses[size].original}
          `}>
            {formatPrice(originalAmount)}
          </span>
        )}
      </div>

      {/* Savings message */}
      {hasDiscount && showSavings && (
        <div className={`text-green-600 mt-1 ${sizeClasses[size].label}`}>
          Hemat {formatPrice(savingsAmount)} ({discountPercent}%)
        </div>
      )}

      {/* Per unit price for bulk items */}
      {label?.toLowerCase().includes('kg') && amount > 100000 && (
        <div className={`text-amber-600 mt-1 ${sizeClasses[size].label}`}>
          {formatPrice(amount / parseInt(label))} per kg
        </div>
      )}
    </div>
  )
})

PriceDisplay.displayName = 'PriceDisplay'

export default PriceDisplay