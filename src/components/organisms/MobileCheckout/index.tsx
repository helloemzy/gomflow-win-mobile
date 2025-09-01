'use client'

import { memo, useState } from 'react'
import Button from '@/components/atoms/Button'
import PriceDisplay from '@/components/molecules/PriceDisplay'
import { useIndonesianFormat } from '@/hooks/useIndonesianFormat'

interface MobileCheckoutProps {
  campaignId: string
  productName: string
  pricePerKg: number
  currentDiscount: number
  onCheckout: (quantity: number) => Promise<void>
}

/**
 * Mobile-optimized checkout component
 * - Single-screen checkout flow
 * - Visual quantity selector
 * - Indonesian payment methods
 * - Trust indicators throughout
 */
const MobileCheckout = memo(({ 
  campaignId,
  productName,
  pricePerKg,
  currentDiscount,
  onCheckout
}: MobileCheckoutProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0.5) // Default 500g
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)
  const { formatCurrency, formatWeight } = useIndonesianFormat()

  // Quantity options with Indonesian preferences
  const quantities = [
    { value: 0.25, label: '250g', description: 'Coba dulu', popular: false },
    { value: 0.5, label: '500g', description: 'Paling laris', popular: true },
    { value: 1, label: '1kg', description: 'Stock bulanan', popular: false },
    { value: 2, label: '2kg', description: 'Untuk bisnis', popular: false }
  ]

  const discountedPrice = pricePerKg * (1 - currentDiscount / 100)
  const totalPrice = discountedPrice * selectedQuantity
  const savings = (pricePerKg - discountedPrice) * selectedQuantity

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      await onCheckout(selectedQuantity)
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-t-3xl shadow-xl">
      {/* Handle bar for bottom sheet feel */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-gray-300 rounded-full" />
      </div>

      <div className="px-4 pb-4">
        {/* Product Summary */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-amber-900 mb-1">{productName}</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-600 font-semibold">
              Hemat {currentDiscount}%
            </span>
            <span className="text-gray-600">
              Per kg: {formatCurrency(discountedPrice)}
            </span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-amber-800 mb-3">
            Pilih Jumlah
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quantities.map((qty) => (
              <button
                key={qty.value}
                onClick={() => setSelectedQuantity(qty.value)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all
                  ${selectedQuantity === qty.value 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 bg-white hover:border-purple-300'
                  }
                `}
              >
                {qty.popular && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Favorit
                  </span>
                )}
                <div className="font-bold text-amber-900">{qty.label}</div>
                <div className="text-xs text-gray-600 mt-1">{qty.description}</div>
                <div className="text-sm font-semibold text-purple-600 mt-2">
                  {formatCurrency(discountedPrice * qty.value)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-amber-50 rounded-xl p-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-amber-700">Harga Normal</span>
              <span className="line-through text-gray-500">
                {formatCurrency(pricePerKg * selectedQuantity)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-700">Diskon Group Buying</span>
              <span className="text-green-600 font-semibold">
                -{formatCurrency(savings)}
              </span>
            </div>
            <div className="border-t border-amber-200 pt-2 flex justify-between">
              <span className="font-semibold text-amber-900">Total</span>
              <PriceDisplay
                amount={totalPrice}
                size="large"
                variant="discount"
                showSavings={false}
              />
            </div>
          </div>
        </div>

        {/* Payment Methods Preview */}
        <div className="mb-6">
          <button
            onClick={() => setShowPaymentMethods(!showPaymentMethods)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-700">
              Metode Pembayaran Tersedia
            </span>
            <span className="text-gray-400">
              {showPaymentMethods ? '▼' : '▶'}
            </span>
          </button>
          
          {showPaymentMethods && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {['GoPay', 'OVO', 'DANA', 'BCA', 'Mandiri', 'BNI', 'Visa', 'Master'].map((method) => (
                <div
                  key={method}
                  className="bg-white border border-gray-200 rounded-lg p-2 text-center"
                >
                  <span className="text-xs text-gray-600">{method}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="text-center p-2">
            <div className="text-green-500 text-xl mb-1">🔒</div>
            <div className="text-xs text-gray-600">Pembayaran Aman</div>
          </div>
          <div className="text-center p-2">
            <div className="text-blue-500 text-xl mb-1">↩️</div>
            <div className="text-xs text-gray-600">Garansi 100%</div>
          </div>
          <div className="text-center p-2">
            <div className="text-purple-500 text-xl mb-1">🚚</div>
            <div className="text-xs text-gray-600">Gratis Ongkir*</div>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          variant="primary"
          size="xl"
          fullWidth
          loading={isProcessing}
          onClick={handleCheckout}
          className="mb-3"
        >
          {isProcessing ? 'Memproses...' : `Bayar ${formatCurrency(totalPrice)}`}
        </Button>

        {/* Terms */}
        <p className="text-xs text-center text-gray-500">
          Dengan melanjutkan, kamu setuju dengan{' '}
          <a href="/terms" className="text-purple-600 underline">
            Syarat & Ketentuan
          </a>
        </p>

        {/* Urgency Indicator */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 animate-pulse">⚡</span>
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">23 orang</span> sedang melihat produk ini
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

MobileCheckout.displayName = 'MobileCheckout'

export default MobileCheckout