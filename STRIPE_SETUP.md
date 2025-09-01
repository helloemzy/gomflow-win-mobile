# GOMFLOW Stripe Payment Setup Guide

## Quick Setup Instructions (10 minutes)

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" and create account
3. Complete business verification for Indonesia:
   - Business type: Sole Proprietorship or PT (depending on setup)
   - Business address in Indonesia
   - Indonesian bank account for payouts

### 2. Get API Keys
1. In Stripe Dashboard → Developers → API Keys
2. Copy the following:
   - **Publishable key**: `pk_test_...` (for frontend)
   - **Secret key**: `sk_test_...` (for backend)
3. **Important**: Use test keys during development

### 3. Configure Webhook Endpoint
1. In Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Set endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the **Webhook Secret**: `whsec_...`

### 4. Update Environment Variables
Edit `.env.local`:
```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL (update for production)
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

### 5. Test Payment Flow
1. Restart development server: `npm run dev`
2. Create a test campaign (via dashboard)
3. Visit campaign page: `/campaigns/[campaign-id]`
4. Use Stripe test cards:
   - **Success**: `4242424242424242`
   - **Decline**: `4000000000000002`
   - **Require 3D Secure**: `4000002500003155`

## Indonesian Payment Methods

### Supported Methods
- **Credit/Debit Cards**: Visa, Mastercard, JCB
- **Digital Wallets**: GoPay, OVO (via Stripe)
- **Bank Transfers**: BCA, Mandiri, BRI, BNI
- **E-wallets**: Dana, ShopeePay (via Stripe Connect)

### Currency Configuration
- **Primary Currency**: IDR (Indonesian Rupiah)
- **Minimum Amount**: IDR 10,000 (≈$0.67 USD)
- **Maximum Amount**: IDR 400,000,000 (≈$26,700 USD)

## Production Checklist

### ✅ Before Going Live
- [ ] Complete Stripe business verification
- [ ] Add Indonesian bank account for payouts
- [ ] Switch to live API keys (`pk_live_...`, `sk_live_...`)
- [ ] Update webhook URL to production domain
- [ ] Test with small amounts first
- [ ] Set up fraud prevention rules
- [ ] Configure tax settings for Indonesia

### ✅ Security Requirements
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Webhook signature verification active
- [ ] PCI compliance via Stripe Checkout
- [ ] No sensitive card data stored locally

## Key Features Implemented

### 🎯 Dynamic Pricing
- Automatic group discounts based on quantity thresholds
- Real-time price calculation with Indonesian Rupiah
- Progressive discount tiers (10% at 25kg, 20% at 50kg)

### 💳 Secure Checkout
- Stripe Checkout integration (PCI compliant)
- Support for Indonesian payment methods
- Automatic webhook processing for order completion
- Failed payment handling and retry mechanisms

### 📊 Order Management
- Automatic order creation in Supabase
- Campaign progress tracking and completion
- Email confirmations and payment receipts
- Real-time inventory updates

## Expected Performance

### 💰 Transaction Fees (Stripe Indonesia)
- **Domestic cards**: 2.9% + IDR 2,000
- **International cards**: 3.9% + IDR 2,000
- **E-wallets**: 2.0% + IDR 1,500
- **Bank transfers**: 1.5% + IDR 2,500

### 📈 Success Metrics
- **Payment success rate**: >95% expected
- **Checkout completion**: >80% expected  
- **Processing time**: <3 seconds average
- **Refund processing**: 5-10 business days

## Troubleshooting

### Common Issues
- **Webhook failures**: Check endpoint URL and signature verification
- **Payment declined**: Use test cards or check Indonesian regulations
- **Currency errors**: Ensure all amounts are in IDR (Indonesian Rupiah)
- **Timeout errors**: Verify network connectivity and API limits

### Support Resources
- **Stripe Indonesia Docs**: [stripe.com/id](https://stripe.com/id)
- **Payment Methods Guide**: [stripe.com/docs/payments/payment-methods](https://stripe.com/docs/payments/payment-methods)
- **Webhook Testing**: Use Stripe CLI for local development

---

**Next Step**: Once Stripe is configured, payments will work end-to-end and enable real GMV validation!

🚀 **Expected Result**: Functional payment system ready for Indonesian coffee group buying campaigns.