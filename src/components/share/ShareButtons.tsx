'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

interface ShareButtonsProps {
  campaignId: string
  campaignTitle: string
  campaignUrl: string
  onShareComplete?: () => void
}

export default function ShareButtons({ 
  campaignId, 
  campaignTitle, 
  campaignUrl, 
  onShareComplete 
}: ShareButtonsProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  const supabase = createClient()

  const handleShare = async (platform: string) => {
    setIsSharing(true)

    try {
      // Track the share action
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Update user's share status for this campaign (if they've made an order)
        await (supabase as any)
          .from('orders')
          .update({ shared_status: true })
          .eq('campaign_id', campaignId)
          .eq('customer_email', user.email)
          .eq('payment_status', 'completed')
      }

      // Generate share content
      const shareText = `☕ Bergabung dengan grup pembelian kopi premium!\n\n${campaignTitle}\n\n🎯 Mari kita capai target bersama untuk diskon lebih besar!\n💰 Hemat hingga 20% dengan berbagi link ini\n\n${campaignUrl}\n\n#KopiPremium #GroupBuying #GOMFLOW`

      // Handle different sharing platforms
      switch (platform) {
        case 'whatsapp':
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
          window.open(whatsappUrl, '_blank')
          break
          
        case 'telegram':
          const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(shareText)}`
          window.open(telegramUrl, '_blank')
          break
          
        case 'facebook':
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`
          window.open(facebookUrl, '_blank')
          break
          
        case 'twitter':
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
          window.open(twitterUrl, '_blank')
          break
          
        case 'copy':
          await navigator.clipboard.writeText(campaignUrl)
          setShareSuccess(true)
          setTimeout(() => setShareSuccess(false), 3000)
          break
      }

      if (onShareComplete) {
        onShareComplete()
      }

    } catch (error) {
      console.error('Share error:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const shareButtons = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      popular: true
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: '📋',
      color: 'bg-gray-500 hover:bg-gray-600',
      popular: true
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '👥',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600'
    }
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">
          Share & Help Everyone Save! 🎯
        </h3>
        <p className="text-amber-700 text-sm">
          Share this campaign with friends to unlock group discounts for everyone
        </p>
      </div>

      {shareSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-green-700 text-sm font-medium">✅ Link copied to clipboard!</p>
        </div>
      )}

      {/* Popular Share Options */}
      <div className="grid grid-cols-2 gap-3">
        {shareButtons.filter(btn => btn.popular).map((button) => (
          <button
            key={button.id}
            onClick={() => handleShare(button.id)}
            disabled={isSharing}
            className={`${button.color} disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2`}
          >
            <span>{button.icon}</span>
            <span>{button.name}</span>
          </button>
        ))}
      </div>

      {/* More Share Options */}
      <details className="group">
        <summary className="cursor-pointer text-amber-700 hover:text-amber-800 text-sm font-medium text-center">
          More sharing options ↓
        </summary>
        
        <div className="mt-3 grid grid-cols-3 gap-2">
          {shareButtons.filter(btn => !btn.popular).map((button) => (
            <button
              key={button.id}
              onClick={() => handleShare(button.id)}
              disabled={isSharing}
              className={`${button.color} disabled:opacity-50 text-white text-sm font-medium py-2 px-3 rounded transition-colors flex items-center justify-center space-x-1`}
            >
              <span className="text-xs">{button.icon}</span>
              <span>{button.name}</span>
            </button>
          ))}
        </div>
      </details>

      {/* Share Benefits */}
      <div className="bg-purple-50 rounded-lg p-4 text-center">
        <h4 className="font-medium text-purple-900 mb-2">Why Share?</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-purple-700">
          <div>
            <div className="font-medium text-purple-800">Help Friends Save</div>
            <div>Group discounts benefit everyone</div>
          </div>
          <div>
            <div className="font-medium text-purple-800">Build Community</div>
            <div>Grow the coffee lover network</div>
          </div>
        </div>
      </div>

      {/* Share Statistics */}
      <div className="text-center text-xs text-amber-600">
        <p>Campaigns with more shares typically complete 3x faster! 🚀</p>
      </div>
    </div>
  )
}