'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

interface OnboardingFormProps {
  userEmail: string
  onComplete?: () => void
}

export default function OnboardingForm({ userEmail, onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    tiktok_handle: '',
    instagram_handle: '',
    follower_count: '',
    content_focus: 'coffee',
    business_experience: 'beginner',
    why_join: '',
    agree_terms: false
  })

  const supabase = createClient()
  const totalSteps = 3

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      // Update influencer profile with onboarding data
      const { error: updateError } = await (supabase as any)
        .from('influencers')
        .update({
          tiktok_handle: formData.tiktok_handle.replace('@', ''),
          status: 'pending' // Will be reviewed by admin
        })
        .eq('email', userEmail)

      if (updateError) {
        throw new Error(updateError.message)
      }

      if (onComplete) {
        onComplete()
      }

    } catch (err: any) {
      console.error('Onboarding submission error:', err)
      setError(err.message || 'Failed to complete onboarding')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = formData.tiktok_handle.trim() || formData.instagram_handle.trim()
  const canProceedStep2 = formData.follower_count && formData.content_focus
  const canSubmit = canProceedStep1 && canProceedStep2 && formData.agree_terms

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-amber-600 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-amber-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Step 1: Social Media Profiles */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-amber-900 mb-2">
                Connect Your Social Media
              </h2>
              <p className="text-amber-700">
                Link your social media accounts to start your influencer journey with GOMFLOW
              </p>
            </div>

            <div>
              <label htmlFor="tiktok_handle" className="block text-sm font-medium text-amber-800 mb-2">
                TikTok Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-amber-600">@</span>
                <input
                  id="tiktok_handle"
                  type="text"
                  value={formData.tiktok_handle}
                  onChange={(e) => handleInputChange('tiktok_handle', e.target.value.replace('@', ''))}
                  placeholder="your_tiktok_username"
                  className="w-full pl-8 pr-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <p className="text-sm text-amber-600 mt-1">Your main TikTok account for coffee content</p>
            </div>

            <div>
              <label htmlFor="instagram_handle" className="block text-sm font-medium text-amber-800 mb-2">
                Instagram Username (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-amber-600">@</span>
                <input
                  id="instagram_handle"
                  type="text"
                  value={formData.instagram_handle}
                  onChange={(e) => handleInputChange('instagram_handle', e.target.value.replace('@', ''))}
                  placeholder="your_instagram_username"
                  className="w-full pl-8 pr-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <p className="text-sm text-amber-600 mt-1">Additional platform for promotion</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-2">Why we need this:</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Verify your influencer status and audience</li>
                <li>• Help customers recognize your campaigns</li>
                <li>• Track campaign performance and engagement</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 2: Audience & Focus */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-amber-900 mb-2">
                Tell Us About Your Audience
              </h2>
              <p className="text-amber-700">
                Help us understand your content and audience to match you with the right opportunities
              </p>
            </div>

            <div>
              <label htmlFor="follower_count" className="block text-sm font-medium text-amber-800 mb-2">
                Approximate Follower Count *
              </label>
              <select
                id="follower_count"
                value={formData.follower_count}
                onChange={(e) => handleInputChange('follower_count', e.target.value)}
                required
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select range...</option>
                <option value="1k-5k">1,000 - 5,000 followers</option>
                <option value="5k-10k">5,000 - 10,000 followers</option>
                <option value="10k-25k">10,000 - 25,000 followers</option>
                <option value="25k-50k">25,000 - 50,000 followers</option>
                <option value="50k+">50,000+ followers</option>
              </select>
            </div>

            <div>
              <label htmlFor="content_focus" className="block text-sm font-medium text-amber-800 mb-2">
                Primary Content Focus *
              </label>
              <select
                id="content_focus"
                value={formData.content_focus}
                onChange={(e) => handleInputChange('content_focus', e.target.value)}
                required
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="food">Food & Culinary</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="fashion">Fashion & Beauty</option>
                <option value="tech">Tech & Gadgets</option>
                <option value="fitness">Health & Fitness</option>
                <option value="home">Home & Living</option>
                <option value="travel">Travel</option>
                <option value="business">Business & Entrepreneurship</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="business_experience" className="block text-sm font-medium text-amber-800 mb-2">
                Business/Sales Experience
              </label>
              <select
                id="business_experience"
                value={formData.business_experience}
                onChange={(e) => handleInputChange('business_experience', e.target.value)}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="beginner">New to selling products</option>
                <option value="intermediate">Some experience with promotions</option>
                <option value="experienced">Experienced with affiliate marketing</option>
                <option value="expert">Professional influencer/business owner</option>
              </select>
            </div>

            <div>
              <label htmlFor="why_join" className="block text-sm font-medium text-amber-800 mb-2">
                What products would you like to promote? (Optional)
              </label>
              <textarea
                id="why_join"
                value={formData.why_join}
                onChange={(e) => handleInputChange('why_join', e.target.value)}
                placeholder="Tell us what types of products your audience loves and would be interested in buying..."
                rows={3}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Step 3: Terms & Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-amber-900 mb-2">
                Ready to Launch Your Coffee Business?
              </h2>
              <p className="text-amber-700">
                Review your information and agree to our terms to complete your application
              </p>
            </div>

            {/* Profile Summary */}
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="font-semibold text-amber-900 mb-4">Profile Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-amber-700">TikTok:</div>
                  <div className="font-medium text-amber-900">@{formData.tiktok_handle || 'Not provided'}</div>
                </div>
                {formData.instagram_handle && (
                  <div>
                    <div className="text-amber-700">Instagram:</div>
                    <div className="font-medium text-amber-900">@{formData.instagram_handle}</div>
                  </div>
                )}
                <div>
                  <div className="text-amber-700">Followers:</div>
                  <div className="font-medium text-amber-900">{formData.follower_count || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-amber-700">Content Focus:</div>
                  <div className="font-medium text-amber-900 capitalize">{formData.content_focus}</div>
                </div>
              </div>
            </div>

            {/* Commission Info */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">💰 Your Earning Potential</h3>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-bold text-green-800 text-lg">15%</div>
                  <div className="text-green-700">Base Commission</div>
                </div>
                <div>
                  <div className="font-bold text-green-800 text-lg">IDR 150K+</div>
                  <div className="text-green-700">Per Campaign*</div>
                </div>
                <div>
                  <div className="font-bold text-green-800 text-lg">No Risk</div>
                  <div className="text-green-700">No Inventory</div>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-3 text-center">
                *Average earnings based on successful 50kg coffee campaigns
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  id="agree_terms"
                  type="checkbox"
                  checked={formData.agree_terms}
                  onChange={(e) => handleInputChange('agree_terms', e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="agree_terms" className="text-sm text-amber-700">
                  I agree to GOMFLOW's <a href="/terms" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a>. 
                  I understand that I will receive a 15% commission on successful campaigns and that my profile will be reviewed before activation.
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i + 1 === currentStep 
                    ? 'bg-purple-600' 
                    : i + 1 < currentStep 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2)
              }
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Complete Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}