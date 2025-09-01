'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { formatPrice } from '@/lib/stripe'

interface CampaignFormProps {
  onSuccess?: (campaignId: string) => void
  onCancel?: () => void
}

export default function CampaignForm({ onSuccess, onCancel }: CampaignFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    coffee_product: '',
    target_quantity: 50,
    price_per_kg: 150000, // IDR 150,000 per unit
    deadline_days: 7,
    discount_threshold_1: 25,
    discount_threshold_2: 50
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Calculate deadline
      const deadline = new Date()
      deadline.setDate(deadline.getDate() + formData.deadline_days)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('You must be logged in to create a campaign')
      }

      // Get influencer profile
      const { data: influencer, error: influencerError } = await supabase
        .from('influencers')
        .select('id, status')
        .eq('email', user.email!)
        .single()

      if (influencerError || !influencer) {
        throw new Error('Influencer profile not found')
      }

      if ((influencer as any).status !== 'active') {
        throw new Error('Your influencer profile must be approved before creating campaigns')
      }

      // Create campaign
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert([{
          influencer_id: (influencer as any).id,
          coffee_product: formData.coffee_product.trim(),
          target_quantity: formData.target_quantity,
          price_per_kg: formData.price_per_kg,
          deadline: deadline.toISOString(),
          discount_threshold_1: formData.discount_threshold_1,
          discount_threshold_2: formData.discount_threshold_2,
          status: 'active'
        }] as any)
        .select()
        .single()

      if (campaignError) {
        throw new Error(campaignError.message)
      }

      if (onSuccess && campaign) {
        onSuccess((campaign as any).id)
      }

    } catch (err: any) {
      console.error('Campaign creation error:', err)
      setError(err.message || 'Failed to create campaign')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-amber-900 mb-2">
          Create New Campaign
        </h2>
        <p className="text-amber-700">
          Launch a group buying campaign for premium products and earn commission on every sale.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="coffee_product" className="block text-sm font-medium text-amber-800 mb-2">
            Product Name *
          </label>
          <input
            id="coffee_product"
            type="text"
            value={formData.coffee_product}
            onChange={(e) => handleInputChange('coffee_product', e.target.value)}
            required
            placeholder="e.g., Premium Wireless Headphones, Organic Matcha Tea, etc."
            className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Target Quantity */}
        <div>
          <label htmlFor="target_quantity" className="block text-sm font-medium text-amber-800 mb-2">
            Target Quantity (units) *
          </label>
          <input
            id="target_quantity"
            type="number"
            min="10"
            max="500"
            value={formData.target_quantity}
            onChange={(e) => handleInputChange('target_quantity', parseInt(e.target.value))}
            required
            className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-sm text-amber-600 mt-1">
            Minimum 10 units, maximum 500 units. Higher targets may take longer to complete.
          </p>
        </div>

        {/* Price per unit */}
        <div>
          <label htmlFor="price_per_kg" className="block text-sm font-medium text-amber-800 mb-2">
            Price per Unit (IDR) *
          </label>
          <input
            id="price_per_kg"
            type="number"
            min="50000"
            max="1000000"
            step="1000"
            value={formData.price_per_kg}
            onChange={(e) => handleInputChange('price_per_kg', parseInt(e.target.value))}
            required
            className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-sm text-amber-600 mt-1">
            Current: {formatPrice(formData.price_per_kg)}/unit • Recommended range: IDR 50,000 - 500,000
          </p>
        </div>

        {/* Campaign Duration */}
        <div>
          <label htmlFor="deadline_days" className="block text-sm font-medium text-amber-800 mb-2">
            Campaign Duration (days) *
          </label>
          <select
            id="deadline_days"
            value={formData.deadline_days}
            onChange={(e) => handleInputChange('deadline_days', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={3}>3 days</option>
            <option value={7}>7 days (Recommended)</option>
            <option value={14}>14 days</option>
            <option value={21}>21 days</option>
            <option value={30}>30 days</option>
          </select>
          <p className="text-sm text-amber-600 mt-1">
            Campaign will end on: {new Date(Date.now() + formData.deadline_days * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')}
          </p>
        </div>

        {/* Discount Thresholds */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="discount_threshold_1" className="block text-sm font-medium text-amber-800 mb-2">
              First Discount at (kg) *
            </label>
            <input
              id="discount_threshold_1"
              type="number"
              min="5"
              max={formData.target_quantity}
              value={formData.discount_threshold_1}
              onChange={(e) => handleInputChange('discount_threshold_1', parseInt(e.target.value))}
              required
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-amber-600 mt-1">10% discount unlocked</p>
          </div>

          <div>
            <label htmlFor="discount_threshold_2" className="block text-sm font-medium text-amber-800 mb-2">
              Second Discount at (kg) *
            </label>
            <input
              id="discount_threshold_2"
              type="number"
              min={formData.discount_threshold_1 + 1}
              max={formData.target_quantity}
              value={formData.discount_threshold_2}
              onChange={(e) => handleInputChange('discount_threshold_2', parseInt(e.target.value))}
              required
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-amber-600 mt-1">20% discount unlocked</p>
          </div>
        </div>

        {/* Revenue Preview */}
        <div className="bg-amber-50 rounded-lg p-4">
          <h3 className="font-medium text-amber-900 mb-3">Revenue Preview</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-amber-700">If campaign succeeds:</div>
              <div className="font-semibold text-amber-900">
                {formatPrice(formData.target_quantity * formData.price_per_kg)}
              </div>
              <div className="text-xs text-amber-600">Total campaign value</div>
            </div>
            <div>
              <div className="text-amber-700">Your commission (15%):</div>
              <div className="font-semibold text-green-700">
                {formatPrice(formData.target_quantity * formData.price_per_kg * 0.15)}
              </div>
              <div className="text-xs text-amber-600">Estimated earnings</div>
            </div>
            <div>
              <div className="text-amber-700">Per kilogram sold:</div>
              <div className="font-semibold text-amber-900">
                {formatPrice(formData.price_per_kg * 0.15)}
              </div>
              <div className="text-xs text-amber-600">Commission per kg</div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.coffee_product.trim()}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Creating Campaign...' : 'Launch Campaign'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Terms */}
        <div className="text-xs text-amber-600">
          By creating a campaign, you agree to GOMFLOW's terms of service and commission structure. 
          You are responsible for product quality and fulfillment coordination.
        </div>
      </form>
    </div>
  )
}