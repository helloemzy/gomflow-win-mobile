'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency, calculateDiscount } from '@/lib/utils'

interface MobileCampaignHeroProps {
  campaign: {
    id: string
    coffee_product: string
    target_quantity: number
    current_quantity: number
    price_per_kg: number
    deadline: string
    status: string
  }
  onPurchase: (quantity: number) => void
  isLoading?: boolean
}

export default function MobileCampaignHero({ 
  campaign, 
  onPurchase, 
  isLoading = false 
}: MobileCampaignHeroProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState('')

  const progress = (campaign.current_quantity / campaign.target_quantity) * 100
  const currentDiscount = calculateDiscount(campaign.current_quantity, campaign.target_quantity)
  const nextDiscountAt = campaign.current_quantity < campaign.target_quantity * 0.5 
    ? Math.ceil(campaign.target_quantity * 0.5) 
    : campaign.target_quantity

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const deadline = new Date(campaign.deadline).getTime()
      const difference = deadline - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        
        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h left`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m left`)
        } else {
          setTimeLeft(`${minutes}m left`)
        }
      } else {
        setTimeLeft('Expired')
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)
    return () => clearInterval(timer)
  }, [campaign.deadline])

  const quantities = [
    { value: 1, label: '1 unit', popular: false },
    { value: 2, label: '2 units', popular: true },
    { value: 5, label: '5 units', popular: false }
  ]

  const originalPrice = campaign.price_per_kg * selectedQuantity
  const discountAmount = (originalPrice * currentDiscount) / 100
  const finalPrice = originalPrice - discountAmount

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
      {/* Hero Header */}
      <div className="px-4 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold leading-tight mb-2">
              {campaign.coffee_product}
            </h1>
            <div className="flex items-center space-x-4 text-purple-100">
              <span className="text-sm">⏰ {timeLeft}</span>
              <span className="text-sm">🎯 {campaign.current_quantity}/{campaign.target_quantity}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currentDiscount > 0 ? (
                <>
                  <span className="line-through text-purple-200 text-lg">
                    {formatCurrency(originalPrice)}
                  </span>
                  <div>{formatCurrency(finalPrice)}</div>
                </>
              ) : (
                formatCurrency(originalPrice)
              )}
            </div>
            {currentDiscount > 0 && (
              <div className="text-sm text-green-300 font-medium">
                Save {currentDiscount}%
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-purple-100 mb-2">
            <span>Progress to next discount</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-purple-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="h-full w-full rounded-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
          {currentDiscount === 0 && (
            <div className="text-xs text-purple-200 mt-1">
              {nextDiscountAt - campaign.current_quantity} more units needed for 10% discount
            </div>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <div className="text-sm font-medium text-purple-100 mb-3">Select Quantity</div>
          <div className="grid grid-cols-3 gap-2">
            {quantities.map((qty) => (
              <button
                key={qty.value}
                onClick={() => setSelectedQuantity(qty.value)}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  selectedQuantity === qty.value
                    ? 'border-amber-400 bg-white/10 text-white'
                    : 'border-purple-400 text-purple-100 hover:border-purple-300'
                }`}
              >
                {qty.popular && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 text-xs px-1.5 py-0.5 rounded-full text-white font-medium">
                    Popular
                  </div>
                )}
                <div className="font-semibold">{qty.label}</div>
                <div className="text-xs mt-1">
                  {formatCurrency(campaign.price_per_kg * qty.value)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="px-4 py-4 bg-purple-800/50 backdrop-blur-sm border-t border-purple-500/30">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="text-lg font-bold">
              Total: {formatCurrency(finalPrice)}
            </div>
            {currentDiscount > 0 && (
              <div className="text-xs text-green-300">
                You save {formatCurrency(discountAmount)}!
              </div>
            )}
          </div>
          <Button
            onClick={() => onPurchase(selectedQuantity)}
            loading={isLoading}
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold min-w-[120px]"
          >
            Join Group
          </Button>
        </div>
        
        {/* Next Discount Incentive */}
        {currentDiscount < 20 && (
          <div className="mt-3 text-center">
            <div className="text-xs text-purple-200">
              🎯 {nextDiscountAt - campaign.current_quantity} more people needed for bigger discount!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}