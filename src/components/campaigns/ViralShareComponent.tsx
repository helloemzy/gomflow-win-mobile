'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'
import { formatShareText } from '@/lib/utils'

interface ViralShareComponentProps {
  campaignId: string
  campaignTitle: string
  campaignUrl: string
  currentDiscount: number
  currentQuantity: number
  onShareComplete?: () => void
}

export default function ViralShareComponent({ 
  campaignId, 
  campaignTitle, 
  campaignUrl,
  currentDiscount,
  currentQuantity,
  onShareComplete 
}: ViralShareComponentProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [shareSuccess, setShareSuccess] = useState<string | null>(null)
  const [shareCount, setShareCount] = useState(0)

  const supabase = createClient()

  const trackShare = async (platform: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await (supabase as any)
          .from('orders')
          .update({ shared_status: true })
          .eq('campaign_id', campaignId)
          .eq('customer_email', user.email)
          .eq('payment_status', 'completed')
        
        setShareCount(prev => prev + 1)
      }
    } catch (error) {
      console.error('Share tracking error:', error)
    }
  }

  const handleShare = async (platform: string) => {
    setIsSharing(true)
    
    try {
      const shareText = formatShareText(campaignTitle, campaignUrl, currentDiscount)
      
      switch (platform) {
        case 'whatsapp':
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
          window.open(whatsappUrl, '_blank')
          break
          
        case 'telegram':
          const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(shareText)}`
          window.open(telegramUrl, '_blank')
          break
          
        case 'twitter':
          const twitterText = `🛍️ ${campaignTitle} - Group buying deal! Save ${currentDiscount}% when we hit the target! ${campaignUrl} #GroupBuying #GOMFLOW`
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`
          window.open(twitterUrl, '_blank')
          break
          
        case 'facebook':
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`
          window.open(facebookUrl, '_blank')
          break
          
        case 'copy':
          await navigator.clipboard.writeText(campaignUrl)
          setShareSuccess('Link copied to clipboard!')
          setTimeout(() => setShareSuccess(null), 3000)
          break
      }

      await trackShare(platform)
      if (onShareComplete) onShareComplete()

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
      description: 'Share with friends'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Tweet to followers'
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: '📋',
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Share anywhere'
    }
  ]

  return (
    <Card variant="elevated" className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>🚀</span>
          <span>Share to Help Everyone Save!</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Share Incentive */}
        <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-900 mb-2">
              More People = Bigger Discounts for Everyone! 🎯
            </div>
            <div className="text-sm text-purple-700">
              Current: <span className="font-bold text-purple-800">{currentDiscount}% off</span>
              {currentDiscount < 20 && (
                <span> • Next: <span className="font-bold text-green-700">
                  {currentDiscount === 0 ? '10' : '20'}% off when more people join
                </span></span>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {shareSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center text-green-700">
              <span className="mr-2">✅</span>
              <span className="font-medium">{shareSuccess}</span>
            </div>
          </div>
        )}

        {/* Share Buttons Grid */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {shareButtons.map((button) => (
            <Button
              key={button.id}
              onClick={() => handleShare(button.id)}
              disabled={isSharing}
              className={`${button.color} text-white justify-start space-x-3 py-4`}
              fullWidth
            >
              <span className="text-xl">{button.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{button.name}</div>
                <div className="text-xs opacity-90">{button.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Social Proof */}
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="font-semibold text-amber-900 mb-1">
              {currentQuantity} people have joined so far
            </div>
            <div className="text-sm text-amber-700">
              Campaigns with more shares complete 3x faster!
            </div>
            {shareCount > 0 && (
              <div className="text-xs text-green-600 mt-2 font-medium">
                🎉 You've shared {shareCount} time{shareCount > 1 ? 's' : ''} - thanks for helping!
              </div>
            )}
          </div>
        </div>

        {/* Why Share Section */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg mb-1">💰</div>
            <div className="font-medium text-purple-900">Help Friends Save</div>
            <div className="text-purple-700">Group discounts benefit everyone</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg mb-1">🌟</div>
            <div className="font-medium text-purple-900">Build Community</div>
            <div className="text-purple-700">Grow your network together</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}