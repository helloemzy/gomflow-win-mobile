'use client'

import { useState } from 'react'
import { stripePromise } from '@/lib/stripe'
import { formatPrice } from '@/lib/stripe'

interface CheckoutButtonProps {
  campaignId: string
  quantity: number
  pricePerKg: number
  currentQuantity: number
  discountThreshold1: number
  discountThreshold2: number
  disabled?: boolean
  className?: string
}

export default function CheckoutButton({
  campaignId,
  quantity,
  pricePerKg,
  currentQuantity,
  discountThreshold1,
  discountThreshold2,
  disabled = false,
  className = ''
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Calculate pricing
  const basePrice = pricePerKg * quantity
  const totalAfterOrder = currentQuantity + quantity
  let finalPrice = basePrice
  let discountPercent = 0

  if (totalAfterOrder >= discountThreshold2) {
    finalPrice = basePrice * 0.8
    discountPercent = 20
  } else if (totalAfterOrder >= discountThreshold1) {
    finalPrice = basePrice * 0.9
    discountPercent = 10
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          quantity,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Pricing Display */}
      <div className="bg-amber-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-amber-700">Base Price ({quantity}kg)</span>
          <span className="text-amber-900 font-medium">{formatPrice(basePrice)}</span>
        </div>
        
        {discountPercent > 0 && (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-700">Group Discount (-{discountPercent}%)</span>
              <span className="text-green-700 font-medium">-{formatPrice(basePrice - finalPrice)}</span>
            </div>
            <div className="border-t border-amber-200 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-amber-800 font-semibold">Final Price</span>
                <span className="text-amber-900 font-bold text-lg">{formatPrice(finalPrice)}</span>
              </div>
            </div>
          </>
        )}
        
        {discountPercent === 0 && (
          <div className="border-t border-amber-200 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-amber-800 font-semibold">Total Price</span>
              <span className="text-amber-900 font-bold text-lg">{formatPrice(finalPrice)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Discount Progress Indicator */}
      {discountPercent === 0 && (
        <div className="text-sm text-amber-600">
          {totalAfterOrder < discountThreshold1 && (
            <p>
              🎯 Add {discountThreshold1 - totalAfterOrder}kg more to unlock 10% group discount!
            </p>
          )}
          {totalAfterOrder >= discountThreshold1 && totalAfterOrder < discountThreshold2 && (
            <p>
              🎯 Add {discountThreshold2 - totalAfterOrder}kg more to unlock 20% group discount!
            </p>
          )}
        </div>
      )}

      {discountPercent > 0 && (
        <div className="text-sm text-green-600">
          🎉 You've unlocked {discountPercent}% group discount!
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={disabled || isLoading}
        className={`w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${className}`}
      >
        {isLoading ? 'Processing...' : `Buy Now - ${formatPrice(finalPrice)}`}
      </button>
    </div>
  )
}