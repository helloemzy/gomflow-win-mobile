'use client'

import { ButtonHTMLAttributes, ReactNode, forwardRef, memo } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger'
  size?: 'small' | 'medium' | 'large' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  children: ReactNode
}

/**
 * Mobile-optimized button component with Indonesian user patterns
 * - Minimum 48px touch target for mobile
 * - Loading states with spinner
 * - WhatsApp variant for primary sharing action
 */
const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'large',
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    
    // Size classes optimized for mobile touch targets
    const sizeClasses = {
      small: 'min-h-[40px] px-3 py-2 text-sm',
      medium: 'min-h-[44px] px-4 py-2.5 text-sm',
      large: 'min-h-[48px] px-6 py-3 text-base', // Recommended for mobile
      xl: 'min-h-[56px] px-8 py-4 text-lg'
    }

    // Variant styles with Indonesian color preferences
    const variantClasses = {
      primary: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-sm',
      secondary: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-sm',
      outline: 'bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
      ghost: 'bg-transparent text-amber-700 hover:bg-amber-50',
      whatsapp: 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-sm',
      danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-sm'
    }

    const baseClasses = [
      'relative inline-flex items-center justify-center',
      'font-medium rounded-lg transition-all duration-150',
      'touch-manipulation select-none', // Optimize for touch
      'active:scale-[0.98]', // Tactile feedback
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
    ].join(' ')

    return (
      <button
        ref={ref}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${loading ? 'cursor-wait' : ''}
          ${className}
        `.trim()}
        disabled={disabled || loading}
        {...props}
      >
        {/* Loading spinner overlay */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
            <svg 
              className="animate-spin h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}

        {/* Button content */}
        <span className={`inline-flex items-center ${loading ? 'opacity-0' : ''}`}>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </span>
      </button>
    )
  }
))

Button.displayName = 'Button'

export default Button