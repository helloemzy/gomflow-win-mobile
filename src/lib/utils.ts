import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatQuantity(quantity: number, unit = 'units'): string {
  return `${quantity.toLocaleString()} ${unit}`
}

export function calculateDiscount(currentQuantity: number, targetQuantity: number): number {
  const progress = currentQuantity / targetQuantity
  if (progress >= 1.0) return 20 // 20% discount when target reached
  if (progress >= 0.5) return 10 // 10% discount at 50% progress
  return 0
}

export function formatShareText(campaignTitle: string, campaignUrl: string, discount?: number): string {
  const discountText = discount ? ` Save ${discount}%!` : ''
  return `🛍️ Check out this group buying deal!

${campaignTitle}

🎯 Join the group to unlock bigger discounts!${discountText}
💰 The more people join, the more everyone saves!

${campaignUrl}

#GroupBuying #GOMFLOW #Deals`
}