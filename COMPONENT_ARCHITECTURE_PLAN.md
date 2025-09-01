# GOMFLOW Component Architecture Plan
**Mobile-First Indonesian Coffee Influencer Platform**
**Last Updated**: 2025-09-01
**Implementation Timeline**: 4 Weeks

---

## 🎯 Architecture Principles

### Core Design Decisions
1. **Mobile-First, Not Mobile-Only**: Design for 360px screens, enhance for larger
2. **Indonesian User Patterns**: WhatsApp-centric, visual-heavy, trust indicators crucial
3. **3G Performance**: <3s initial load, lazy load everything non-critical
4. **Conversion Over Perfection**: Every component optimized for action, not aesthetics
5. **Minimal But Extensible**: Start lean, structure for growth

### Performance Targets
- **First Contentful Paint**: <1.5s on 3G
- **Time to Interactive**: <3s on 3G
- **Bundle Size**: <200KB initial JS
- **Image Loading**: Progressive with placeholders
- **Offline Support**: PWA with critical path caching

---

## 📦 Component Refactoring Plan

### 1. CampaignForm Component (Week 1)
**Current Issues**:
- Desktop-optimized layout
- No mobile preview
- Complex form validation
- Missing trust indicators

**Refactoring Actions**:
```typescript
// New structure: Mobile-optimized stepped form
components/
  campaigns/
    CampaignForm/
      index.tsx              // Main container
      MobileSteps/
        ProductStep.tsx      // Product selection with image upload
        PricingStep.tsx      // Visual pricing calculator
        TargetStep.tsx       // Interactive goal setting
      DesktopForm.tsx        // Desktop fallback
      hooks/
        useCampaignForm.ts   // Form logic extraction
        useCommissionCalc.ts // Real-time calculations
```

**Key Improvements**:
- Mobile stepped wizard (one field per screen)
- Visual pricing calculator with live preview
- WhatsApp-style confirmation screen
- Auto-save draft functionality
- Indonesian currency formatting with separators

### 2. ShareButtons Component (Week 1)
**Current Issues**:
- Generic share options
- No Indonesian platform priority
- Missing viral mechanics feedback

**Refactoring Actions**:
```typescript
// New structure: Indonesian-optimized sharing
components/
  share/
    ShareToUnlock/
      index.tsx                // Main unlock flow
      WhatsAppShareCard.tsx    // Primary share method
      InstagramStoryShare.tsx  // Visual story template
      TikTokShareGuide.tsx     // Step-by-step guide
      UnlockProgress.tsx       // Visual feedback
    hooks/
      useShareTracking.ts      // Analytics & rewards
      useViralMultiplier.ts    // Calculate bonus discounts
```

**Key Improvements**:
- WhatsApp as primary (70% of shares)
- Instagram Story template generator
- TikTok video creation guide
- Real-time unlock animation
- Share verification system

### 3. OnboardingForm Component (Week 1)
**Current Issues**:
- Too many fields upfront
- No social proof
- Generic design

**Refactoring Actions**:
```typescript
// New structure: Trust-building onboarding
components/
  onboarding/
    QuickStart/
      index.tsx               // 2-field quick start
      SocialVerification.tsx  // OAuth or handle verify
      SuccessStories.tsx      // Influencer testimonials
    FullOnboarding/
      ProfileBuilder.tsx      // Progressive profile
      AudienceAnalyzer.tsx    // Estimate earnings
      FirstCampaignGuide.tsx  // Immediate value
```

**Key Improvements**:
- 2-field quick start (phone + social handle)
- Social login priority (TikTok/Instagram OAuth)
- Success story carousel during loading
- Earnings calculator based on followers
- Immediate campaign template after signup

---

## 🆕 New Component Specifications

### 1. MobileCampaignPage (Week 2)
**Purpose**: Optimized campaign landing page for mobile buyers

```typescript
interface MobileCampaignPageProps {
  campaign: Campaign
  isShared: boolean
  userLocation: string
}

components/
  campaigns/
    MobileCampaignPage/
      index.tsx
      HeroSection/
        ProductImage.tsx       // Lazy loaded, zoomable
        InfluencerBadge.tsx    // Verified badge + follower count
        UrgencyTimer.tsx       // Countdown with pulse animation
      TrustIndicators/
        SocialProof.tsx        // "23 friends bought this"
        PaymentBadges.tsx      // GoPay, OVO, DANA logos
        GuaranteeCard.tsx      // Money-back guarantee
      PurchaseFlow/
        StickyPriceCard.tsx    // Fixed bottom purchase CTA
        QuantitySelector.tsx   // Visual size selector
        ExpressCheckout.tsx    // One-tap checkout
      ShareToSave/
        ShareRequirement.tsx   // "Share to unlock 10% off"
        ShareProgress.tsx      // Visual progress bar
```

**Mobile-Specific Features**:
- Sticky bottom purchase button (always visible)
- Swipeable product images
- Collapsible sections for details
- Pull-to-refresh for live updates
- One-thumb reachable CTAs

### 2. IndonesianPaymentSelector (Week 2)
**Purpose**: Localized payment method selection

```typescript
interface PaymentSelectorProps {
  amount: number
  onSelect: (method: PaymentMethod) => void
}

components/
  checkout/
    IndonesianPaymentSelector/
      index.tsx
      methods/
        EWalletOptions.tsx     // GoPay, OVO, DANA, LinkAja
        BankTransferOptions.tsx // BCA, Mandiri, BNI
        CreditCardOption.tsx   // Secondary option
      InstallmentCalculator.tsx // Tokopedia Paylater style
      PromoCodeScanner.tsx      // QR code promo scanner
```

**Indonesian-Specific Features**:
- E-wallet logos prominently displayed
- Virtual account generation for bank transfer
- Installment options for >500K IDR
- Promo code integration
- Payment method popularity indicators

### 3. ViralProgressTracker (Week 2)
**Purpose**: Gamified sharing progress visualization

```typescript
interface ViralProgressProps {
  currentShares: number
  sharesNeeded: number
  currentDiscount: number
  nextDiscount: number
}

components/
  viral/
    ViralProgressTracker/
      index.tsx
      MilestoneCard.tsx        // Visual milestone achievements
      ShareLeaderboard.tsx     // Top sharers recognition
      UnlockAnimation.tsx      // Celebration on unlock
      ReferralTree.tsx         // Visual network effect
```

**Gamification Features**:
- Progress rings (like Instagram stories)
- Celebration animations on milestones
- Share streak counter
- Friend contribution visibility
- Next reward preview

### 4. TrustSignalsBar (Week 3)
**Purpose**: Persistent trust indicators for conversion

```typescript
components/
  trust/
    TrustSignalsBar/
      index.tsx
      VerifiedBadge.tsx        // Platform verification
      MoneyBackGuarantee.tsx   // 100% guarantee badge
      SecurePaymentBadge.tsx   // SSL + payment security
      CustomerCount.tsx        // Live customer counter
      ResponseTime.tsx         // "Responds in ~2 hours"
```

**Trust Building Features**:
- Floating trust bar on scroll
- Live update animations
- Local business registration number
- Customer service availability indicator
- Platform verification checkmarks

---

## 📱 Mobile-First Design Patterns

### 1. Responsive Strategy
```scss
// Mobile-first breakpoints
$mobile-small: 360px;   // Base design target
$mobile: 390px;         // Modern phones
$tablet: 768px;         // Tablets
$desktop: 1024px;       // Desktop enhancement

// Component sizing strategy
.component {
  // Mobile first (360px)
  padding: 12px;
  font-size: 14px;
  
  @media (min-width: $mobile) {
    padding: 16px;
    font-size: 15px;
  }
  
  @media (min-width: $tablet) {
    padding: 20px;
    font-size: 16px;
  }
}
```

### 2. Touch Optimization
```typescript
// Minimum touch targets
const TOUCH_TARGET = {
  minimum: 44,  // iOS standard
  preferred: 48, // Material Design
  spacing: 8     // Between targets
}

// Thumb-zone optimization
const THUMB_ZONE = {
  easy: 'bottom 75% of screen',
  stretch: 'top 25% and edges',
  avoid: 'top corners'
}
```

### 3. Indonesian UI Patterns
```typescript
// Localized UI preferences
const INDONESIAN_PATTERNS = {
  colors: {
    trust: '#00AA13',     // Tokopedia green
    sale: '#FF6B35',      // Shopee orange
    premium: '#FFD700'    // Gold for premium
  },
  imagery: {
    heavy: true,          // Image-heavy layouts
    badges: true,         // Many trust badges
    social: true          // Social proof prominent
  },
  text: {
    concise: true,        // Short descriptions
    bilingual: false,     // Indonesian only for MVP
    emoji: true           // Emoji for emphasis
  }
}
```

---

## ⚡ Performance Optimization Approach

### 1. Code Splitting Strategy
```typescript
// Route-based splitting
const CampaignPage = lazy(() => import('./campaigns/CampaignPage'))
const Dashboard = lazy(() => import('./dashboard/Dashboard'))

// Component-based splitting
const ShareModal = lazy(() => import('./modals/ShareModal'))
const PaymentSelector = lazy(() => import('./checkout/PaymentSelector'))

// Utility splitting
const analytics = () => import('./utils/analytics')
const imageOptimizer = () => import('./utils/imageOptimizer')
```

### 2. 3G Optimization Techniques
```typescript
// Progressive image loading
const ImageOptimized = ({ src, alt }) => {
  const [quality, setQuality] = useState('low')
  
  useEffect(() => {
    // Load higher quality based on connection
    if (navigator.connection?.effectiveType === '4g') {
      setQuality('high')
    }
  }, [])
  
  return (
    <img 
      src={`${src}?q=${quality === 'low' ? 30 : 80}`}
      loading="lazy"
      alt={alt}
    />
  )
}

// Debounced interactions
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debounced
}
```

### 3. Bundle Optimization
```javascript
// Next.js config for optimization
module.exports = {
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 40,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([[\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            },
            priority: 10,
            minChunks: 2,
          },
        },
      },
    }
    return config
  },
}
```

---

## 🏗️ Component Library Structure

### Directory Organization
```
src/
  components/
    atoms/              # Basic building blocks
      Button/
      Input/
      Badge/
      Icon/
    molecules/          # Composed components
      FormField/
      PriceCard/
      ShareButton/
      TrustBadge/
    organisms/          # Complex components
      CampaignCard/
      CheckoutForm/
      InfluencerProfile/
      ViralTracker/
    templates/          # Page templates
      CampaignTemplate/
      DashboardTemplate/
      OnboardingTemplate/
    layouts/            # Layout wrappers
      MobileLayout/
      DesktopLayout/
      AuthLayout/
```

### Component Template
```typescript
// Standard component structure
import { memo, forwardRef } from 'react'
import { useIndonesianFormat } from '@/hooks/useIndonesianFormat'
import styles from './Component.module.css'

interface ComponentProps {
  // Props definition
}

const Component = memo(forwardRef<HTMLDivElement, ComponentProps>(
  ({ ...props }, ref) => {
    // Hooks
    const { formatCurrency } = useIndonesianFormat()
    
    // Handlers
    const handleAction = useCallback(() => {
      // Optimized handler
    }, [deps])
    
    // Render
    return (
      <div ref={ref} className={styles.container}>
        {/* Component content */}
      </div>
    )
  }
))

Component.displayName = 'Component'

export default Component
```

---

## 📅 Implementation Timeline

### Week 1: Foundation & Critical Refactoring
**Days 1-2: Component Architecture Setup**
- Set up atomic design structure
- Create base components (Button, Input, Card)
- Implement Indonesian formatting utilities
- Set up component documentation

**Days 3-4: Refactor Existing Components**
- Refactor CampaignForm for mobile
- Optimize ShareButtons for Indonesian platforms
- Simplify OnboardingForm to 2-field start
- Add loading states and error handling

**Days 5-7: Mobile Campaign Page**
- Build MobileCampaignPage component
- Implement sticky purchase CTA
- Add trust indicators
- Optimize images and performance

### Week 2: Conversion Optimization
**Days 8-10: Payment & Checkout**
- Build IndonesianPaymentSelector
- Implement express checkout flow
- Add payment method icons
- Create order confirmation page

**Days 11-12: Viral Mechanics**
- Build ViralProgressTracker
- Implement share-to-unlock UI
- Add celebration animations
- Create referral tracking

**Days 13-14: Trust & Social Proof**
- Build TrustSignalsBar
- Add customer counters
- Implement testimonial cards
- Create urgency indicators

### Week 3: Polish & Testing
**Days 15-16: Performance Optimization**
- Implement code splitting
- Optimize bundle size
- Add progressive loading
- Configure caching strategy

**Days 17-18: Mobile Testing**
- Test on real devices (360px-414px)
- Test on 3G connections
- Fix touch target issues
- Optimize animations

**Days 19-21: Integration & Polish**
- Integrate all components
- Add micro-interactions
- Polish loading states
- Final performance audit

### Week 4: Launch Preparation
**Days 22-23: A/B Test Setup**
- Implement basic analytics
- Set up conversion tracking
- Create variant components
- Configure feature flags

**Days 24-25: Documentation**
- Component usage guides
- Performance benchmarks
- Deployment checklist
- Troubleshooting guide

**Days 26-28: Beta Testing**
- Recruit test influencers
- Monitor real usage
- Fix critical issues
- Prepare for launch

---

## 🎯 Success Metrics

### Performance Metrics
- **Page Load Speed**: <3s on 3G (measured via Lighthouse)
- **First Input Delay**: <100ms
- **Cumulative Layout Shift**: <0.1
- **Bundle Size**: <200KB initial JS

### Conversion Metrics
- **Mobile Conversion Rate**: >2.5%
- **Share-to-Purchase Rate**: >30%
- **Form Completion Rate**: >60%
- **Payment Success Rate**: >85%

### User Experience Metrics
- **Bounce Rate**: <40% on campaign pages
- **Session Duration**: >2 minutes average
- **Pages per Session**: >3 pages
- **Return Visitor Rate**: >20%

---

## 🚀 Quick Wins (Implement First)

1. **Sticky Purchase Button** (2 hours)
   - Massive mobile conversion boost
   - Always visible CTA
   
2. **WhatsApp Share Priority** (1 hour)
   - 70% of Indonesian shares
   - One-tap implementation

3. **Indonesian Currency Format** (30 mins)
   - Rp 150.000 instead of IDR 150000
   - Immediate trust boost

4. **Loading Skeletons** (2 hours)
   - Perceived performance boost
   - Better than spinners

5. **Trust Badges** (1 hour)
   - Payment method logos
   - Verification checkmarks

---

## 🔧 Technical Decisions

### State Management
- **Local State**: useState for component state
- **Global State**: Context API for user/campaign data
- **Server State**: SWR for data fetching with caching
- **Form State**: React Hook Form for complex forms

### Styling Approach
- **Tailwind CSS**: Rapid prototyping
- **CSS Modules**: Component-specific styles
- **CSS-in-JS**: Avoided for performance
- **Animations**: Framer Motion for key interactions

### Testing Strategy
- **Unit Tests**: Critical business logic only
- **Integration Tests**: Key user flows
- **E2E Tests**: Purchase flow only
- **Visual Tests**: Skipped for MVP

### Build Optimization
- **Next.js 14**: App Router for better performance
- **Image Optimization**: Next/Image with blur placeholders
- **Font Optimization**: Local fonts, subset for Indonesian
- **API Routes**: Edge Functions for faster responses

---

## 📝 Implementation Checklist

### Immediate Actions (Week 1, Day 1)
- [ ] Create component architecture folders
- [ ] Set up Indonesian formatting utilities
- [ ] Build base Button component with touch optimization
- [ ] Create mobile-first CSS variables
- [ ] Implement loading skeleton component

### Critical Path (Week 1-2)
- [ ] Refactor CampaignForm for mobile
- [ ] Build MobileCampaignPage
- [ ] Implement WhatsApp share
- [ ] Add sticky purchase button
- [ ] Create trust indicators

### Enhancement Path (Week 3-4)
- [ ] Add animations and transitions
- [ ] Implement A/B testing
- [ ] Optimize performance
- [ ] Add analytics tracking
- [ ] Polish UI details

---

## 🎨 Component Examples

### Mobile-Optimized Button
```typescript
// components/atoms/Button/index.tsx
export const Button = ({ 
  children, 
  variant = 'primary',
  size = 'large',
  fullWidth = true,
  loading = false,
  ...props 
}) => {
  return (
    <button
      className={cn(
        'touch-manipulation transition-all',
        'min-h-[48px] px-6 rounded-lg font-medium',
        'active:scale-95',
        {
          'bg-purple-600 text-white': variant === 'primary',
          'bg-white border-2': variant === 'outline',
          'w-full': fullWidth,
          'opacity-50 cursor-wait': loading
        }
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}
```

### Indonesian Price Display
```typescript
// components/molecules/PriceCard/index.tsx
export const PriceCard = ({ amount, originalAmount, discount }) => {
  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {discount && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
          HEMAT {discount}%
        </span>
      )}
      <div className="mt-2">
        {originalAmount && (
          <div className="text-gray-500 line-through text-sm">
            {formatIDR(originalAmount)}
          </div>
        )}
        <div className="text-2xl font-bold text-green-600">
          {formatIDR(amount)}
        </div>
      </div>
    </div>
  )
}
```

---

This component architecture plan provides a practical, conversion-focused approach specifically optimized for Indonesian mobile users. The emphasis is on quick implementation of high-impact features while maintaining code quality and performance standards suitable for 3G networks.