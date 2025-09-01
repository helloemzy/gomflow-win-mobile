'use client'

import { memo, useState, useEffect } from 'react'
import Button from '@/components/atoms/Button'
import { useIndonesianFormat } from '@/hooks/useIndonesianFormat'

interface ShareToUnlockProps {
  campaignId: string
  campaignTitle: string
  currentDiscount: number
  onShareComplete?: (platform: string) => void
  isOrderPlaced?: boolean
}

/**
 * Indonesian-optimized share-to-unlock component
 * - WhatsApp as primary sharing method
 * - Visual progress towards unlock
 * - Gamified sharing experience
 */
const ShareToUnlock = memo(({ 
  campaignId, 
  campaignTitle,
  currentDiscount,
  onShareComplete,
  isOrderPlaced = false
}: ShareToUnlockProps) => {
  const [hasShared, setHasShared] = useState(false)
  const [shareCount, setShareCount] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const { formatPercentage } = useIndonesianFormat()

  // Share bonus tiers
  const SHARE_BONUSES = [
    { shares: 1, bonus: 5, label: 'Share Pertama' },
    { shares: 3, bonus: 10, label: 'Social Butterfly' },
    { shares: 5, bonus: 15, label: 'Influencer Mode' }
  ]

  const currentBonus = SHARE_BONUSES.find(tier => shareCount >= tier.shares)?.bonus || 0
  const nextBonus = SHARE_BONUSES.find(tier => shareCount < tier.shares)
  const totalDiscount = Math.min(currentDiscount + currentBonus, 30) // Max 30% discount

  // Generate share content
  const generateShareText = (platform: string) => {
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/campaigns/${campaignId}`
      : `https://gomflow.com/campaigns/${campaignId}`

    const messages = {
      whatsapp: `🎉 *${campaignTitle}*\n\n✨ Aku dapat diskon ${formatPercentage(totalDiscount)} dengan group buying!\n\n🛍️ Join sekarang dan hemat bareng:\n${baseUrl}\n\n⏰ Cepetan, tinggal beberapa hari lagi! #GOMFLOW`,
      instagram: `Check out this amazing group buying deal! 🛍️\n\n${campaignTitle}\n\nSave ${formatPercentage(totalDiscount)} when you join!\n\n🔗 Link in bio\n#GroupBuying #GOMFLOW #Hemat`,
      telegram: `🎉 ${campaignTitle}\n\nHemat ${formatPercentage(totalDiscount)} dengan group buying!\n\nJoin sekarang: ${baseUrl}`,
    }

    return messages[platform as keyof typeof messages] || messages.whatsapp
  }

  // Handle share action
  const handleShare = async (platform: string) => {
    const shareText = generateShareText(platform)
    const campaignUrl = `${window.location.origin}/campaigns/${campaignId}`

    try {
      switch (platform) {
        case 'whatsapp':
          // Use WhatsApp Web on desktop, app on mobile
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
          const whatsappUrl = isMobile
            ? `whatsapp://send?text=${encodeURIComponent(shareText)}`
            : `https://web.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
          window.open(whatsappUrl, '_blank')
          break

        case 'instagram':
          // Instagram doesn't have direct share API, show copy instructions
          await navigator.clipboard.writeText(shareText)
          alert('Caption disalin! Buka Instagram dan paste di story/post kamu 📸')
          break

        case 'telegram':
          window.open(
            `https://t.me/share/url?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(shareText)}`,
            '_blank'
          )
          break

        case 'copy':
          await navigator.clipboard.writeText(campaignUrl)
          break
      }

      // Update share state
      setShareCount(prev => prev + 1)
      setHasShared(true)
      
      // Show celebration for milestones
      if (SHARE_BONUSES.some(tier => tier.shares === shareCount + 1)) {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      }

      // Notify parent
      if (onShareComplete) {
        onShareComplete(platform)
      }

    } catch (error) {
      console.error('Share error:', error)
    }
  }

  // Native Web Share API for mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaignTitle,
          text: generateShareText('whatsapp'),
          url: `${window.location.origin}/campaigns/${campaignId}`
        })
        setShareCount(prev => prev + 1)
        setHasShared(true)
      } catch (error) {
        console.log('Share cancelled or failed')
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-purple-900 mb-2">
          {hasShared ? '🎉 Terima Kasih Sudah Share!' : '🎁 Share untuk Diskon Lebih!'}
        </h3>
        <p className="text-purple-700">
          {hasShared 
            ? `Kamu dapat diskon total ${formatPercentage(totalDiscount)}!`
            : 'Bagikan campaign ini dan dapatkan diskon tambahan'
          }
        </p>
      </div>

      {/* Current Discount Display */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Diskon Saat Ini</div>
            <div className="text-2xl font-bold text-green-600">
              {formatPercentage(totalDiscount)}
            </div>
          </div>
          {currentBonus > 0 && (
            <div className="text-right">
              <div className="text-xs text-purple-600">Share Bonus</div>
              <div className="text-lg font-semibold text-purple-700">
                +{formatPercentage(currentBonus)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Progress */}
      {shareCount > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-purple-700">Share Progress</span>
            <span className="font-semibold text-purple-900">{shareCount} shares</span>
          </div>
          <div className="flex gap-1">
            {SHARE_BONUSES.map((tier, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  shareCount >= tier.shares 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          {nextBonus && (
            <p className="text-xs text-purple-600 mt-2">
              {nextBonus.shares - shareCount} share lagi untuk bonus {formatPercentage(nextBonus.bonus)}!
            </p>
          )}
        </div>
      )}

      {/* Primary Share Buttons */}
      <div className="space-y-3 mb-4">
        {/* WhatsApp - Primary CTA */}
        <Button
          variant="whatsapp"
          size="large"
          fullWidth
          onClick={() => handleShare('whatsapp')}
          icon={<span>💬</span>}
        >
          Share ke WhatsApp
        </Button>

        {/* Native Share (Mobile) */}
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <Button
            variant="outline"
            size="large"
            fullWidth
            onClick={handleNativeShare}
            icon={<span>📤</span>}
          >
            Share Lainnya
          </Button>
        )}
      </div>

      {/* Secondary Share Options */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleShare('instagram')}
          className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium active:scale-95 transition-transform"
        >
          📸 Instagram
        </button>
        <button
          onClick={() => handleShare('telegram')}
          className="p-3 bg-blue-500 text-white rounded-lg text-xs font-medium active:scale-95 transition-transform"
        >
          ✈️ Telegram
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="p-3 bg-gray-500 text-white rounded-lg text-xs font-medium active:scale-95 transition-transform"
        >
          📋 Salin Link
        </button>
      </div>

      {/* Benefits List */}
      <div className="mt-6 space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-green-500 mt-0.5">✓</span>
          <p className="text-sm text-purple-700">
            Teman kamu juga dapat diskon yang sama
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-500 mt-0.5">✓</span>
          <p className="text-sm text-purple-700">
            Campaign selesai lebih cepat = pengiriman lebih cepat
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-500 mt-0.5">✓</span>
          <p className="text-sm text-purple-700">
            Bantu influencer favorit kamu sukses
          </p>
        </div>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-xl font-bold text-purple-900">Bonus Unlocked!</p>
            <p className="text-purple-700">+{formatPercentage(currentBonus)} diskon</p>
          </div>
        </div>
      )}
    </div>
  )
})

ShareToUnlock.displayName = 'ShareToUnlock'

export default ShareToUnlock