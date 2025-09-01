import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

// Client-side Stripe
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

// Server-side Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

// Helper function to check if Stripe is configured
export const isStripeConfigured = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const secretKey = process.env.STRIPE_SECRET_KEY
  
  return publishableKey !== 'your_stripe_publishable_key_here' && 
         secretKey !== 'your_stripe_secret_key_here' &&
         publishableKey && 
         secretKey
}

// Convert amount to Stripe format (cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}

// Convert amount from Stripe format to display format
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100
}

// Format price for display
export const formatPrice = (amount: number, currency = 'IDR'): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
  }).format(amount)
}