'use client'

import { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import PriceDisplay from '@/components/molecules/PriceDisplay'

interface MobileCampaignHeroProps {
  campaign: {
    id: string
    coffee_product: string
    price_per_kg: number
    target_quantity: number
    current_quantity: number
    deadline: string
    discount_threshold_1: number
    discount_threshold_2: number
    influencer?: {
      tiktok_handle: string
      follower_count?: string
    }
  }
  totalOrders: number
}

/**
 * Mobile-optimized campaign hero section
 * - Full-width product image with lazy loading
 * - Sticky price card at bottom
 * - Urgency indicators and social proof
 * - Indonesian formatting and trust signals
 */
const MobileCampaignHero = memo(({ campaign, totalOrders }: MobileCampaignHeroProps) => {
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [isUrgent, setIsUrgent] = useState(false)

  // Calculate current discount based on quantity
  const getCurrentDiscount = () => {
    if (campaign.current_quantity >= campaign.discount_threshold_2) return 20
    if (campaign.current_quantity >= campaign.discount_threshold_1) return 10
    return 0
  }

  const currentDiscount = getCurrentDiscount()
  const discountedPrice = campaign.price_per_kg * (1 - currentDiscount / 100)
  const progressPercent = Math.min((campaign.current_quantity / campaign.target_quantity) * 100, 100)

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime()
      const deadline = new Date(campaign.deadline).getTime()
      const difference = deadline - now

      if (difference <= 0) {
        setTimeLeft('Berakhir')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

      // Set urgency if less than 24 hours
      setIsUrgent(days === 0)

      if (days > 0) {
        setTimeLeft(`${days} hari ${hours} jam`)
      } else if (hours > 0) {
        setTimeLeft(`${hours} jam ${minutes} menit`)
      } else {
        setTimeLeft(`${minutes} menit`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [campaign.deadline])

  return (
    <div className="relative w-full">
      {/* Product Image Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] bg-gradient-to-br from-amber-100 to-amber-50">
        {/* Placeholder product image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">☕</div>
        </div>
        
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          {/* Influencer badge */}
          <div className="bg-white/95 backdrop-blur rounded-full px-3 py-2 flex items-center shadow-lg">
            <span className="text-purple-600 font-semibold text-sm">
              @{campaign.influencer?.tiktok_handle || 'verified'}
            </span>
            {campaign.influencer?.follower_count && (
              <span className="ml-2 text-xs text-gray-600">
                {campaign.influencer.follower_count} followers
              </span>
            )}
          </div>

          {/* Discount badge */}
          {currentDiscount > 0 && (
            <div className="bg-red-500 text-white rounded-full px-3 py-2 shadow-lg">
              <span className="font-bold text-sm">-{currentDiscount}%</span>
            </div>
          )}
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Product title on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white text-2xl font-bold drop-shadow-lg">
            {campaign.coffee_product}
          </h1>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="bg-white px-4 py-4">
        {/* Urgency Timer */}
        <div className={`
          rounded-lg p-3 mb-4
          ${isUrgent ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}
        `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`text-2xl mr-2 ${isUrgent ? 'animate-pulse' : ''}`}>
                ⏰
              </span>
              <div>
                <div className={`text-sm ${isUrgent ? 'text-red-600' : 'text-amber-600'}`}>
                  {isUrgent ? 'Segera Berakhir!' : 'Waktu Tersisa'}
                </div>
                <div className={`font-bold ${isUrgent ? 'text-red-700' : 'text-amber-800'}`}>
                  {timeLeft}
                </div>
              </div>
            </div>
            
            {/* Live participant count */}
            <div className="text-right">
              <div className="text-sm text-gray-600">Peserta</div>
              <div className="font-bold text-purple-600">{totalOrders} orang</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-amber-700">Progress Campaign</span>
            <span className="font-semibold text-amber-900">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{campaign.current_quantity} kg terkumpul</span>
            <span>Target: {campaign.target_quantity} kg</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-green-600 text-lg">✅</div>
            <div className="text-xs text-green-700">Terverifikasi</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-blue-600 text-lg">🔒</div>
            <div className="text-xs text-blue-700">Aman 100%</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="text-purple-600 text-lg">💰</div>
            <div className="text-xs text-purple-700">Garansi</div>
          </div>
        </div>

        {/* Next Discount Milestone */}
        {currentDiscount < 20 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-purple-700">
                  🎯 Target Diskon Selanjutnya
                </div>
                <div className="font-semibold text-purple-900">
                  {currentDiscount === 0 
                    ? `${campaign.discount_threshold_1 - campaign.current_quantity} kg lagi untuk diskon 10%`
                    : `${campaign.discount_threshold_2 - campaign.current_quantity} kg lagi untuk diskon 20%`
                  }
                </div>
              </div>
              <div className="text-2xl">
                {currentDiscount === 0 ? '🎁' : '🎉'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Price Card (Mobile) */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg sm:hidden">
        <div className="flex items-center justify-between">
          <PriceDisplay
            amount={discountedPrice}
            originalAmount={currentDiscount > 0 ? campaign.price_per_kg : undefined}
            variant={currentDiscount > 0 ? 'discount' : 'default'}
            size="large"
            showSavings={false}
          />
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold active:scale-95 transition-transform">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  )
})

MobileCampaignHero.displayName = 'MobileCampaignHero'

export default MobileCampaignHero