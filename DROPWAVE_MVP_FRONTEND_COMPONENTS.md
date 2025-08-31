# DROPWAVE MVP Frontend Components - Absolute Essentials Only
## Single Developer, 4 Weeks, 12 Tasks Maximum

### Executive Summary
**Total Components**: 8 essential components only
**Total Tasks**: 12 tasks (6-10 hours each)
**Timeline**: 4 weeks
**Developer**: 1 full-stack developer
**Tech Stack**: Next.js, Tailwind CSS, Stripe, WhatsApp API

---

## Week 1: Foundation Components (3 Tasks)

### Task 1: Design System Setup (8 hours)
**File**: `/components/ui/base.tsx`
```typescript
// Essential design tokens only
const theme = {
  colors: {
    primary: '#FF6B6B',    // Red for urgency
    success: '#4ECDC4',    // Teal for success
    text: '#2D3436',       // Dark gray
    background: '#FFFFFF'   // White
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif'
  }
};

// 3 button variants only
export const Button = ({ variant = 'primary', onClick, children }) => {
  const styles = {
    primary: 'bg-red-500 text-white px-6 py-3 rounded-lg font-semibold',
    secondary: 'border-2 border-gray-300 px-6 py-3 rounded-lg',
    text: 'text-red-500 underline'
  };
  
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
};

// Simple card component
export const Card = ({ children }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    {children}
  </div>
);

// Basic input field
export const Input = ({ label, type = 'text', value, onChange, placeholder }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-2">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);
```

### Task 2: Mobile-First Layout Component (6 hours)
**File**: `/components/Layout.tsx`
```typescript
export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header - no navigation needed for MVP */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-red-500">DROPWAVE</h1>
        </div>
      </header>
      
      {/* Mobile-first container */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
```

### Task 3: Simple Form Wrapper (6 hours)
**File**: `/components/FormWrapper.tsx`
```typescript
export const FormWrapper = ({ onSubmit, children, submitText = 'Submit' }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
      >
        {submitText}
      </button>
    </form>
  );
};
```

---

## Week 2: Core Campaign Components (3 Tasks)

### Task 4: Campaign Creation Form - Single Page (10 hours)
**File**: `/components/CampaignForm.tsx`
```typescript
import { useState } from 'react';
import { Input, FormWrapper } from './ui/base';

export const CampaignForm = ({ onSubmit }) => {
  const [campaign, setCampaign] = useState({
    productName: '',
    description: '',
    price: '',
    targetOrders: '',
    deadline: '',
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Direct submission, no validation complexity
    onSubmit(campaign);
  };

  return (
    <FormWrapper onSubmit={handleSubmit} submitText="Launch Campaign">
      <h2 className="text-2xl font-bold mb-6">Create Your Campaign</h2>
      
      <Input
        label="Product Name"
        value={campaign.productName}
        onChange={(e) => setCampaign({...campaign, productName: e.target.value})}
        placeholder="e.g., Premium Arabica Coffee"
      />
      
      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
        placeholder="Brief description (optional)"
        value={campaign.description}
        onChange={(e) => setCampaign({...campaign, description: e.target.value})}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price (IDR)"
          type="number"
          value={campaign.price}
          onChange={(e) => setCampaign({...campaign, price: e.target.value})}
          placeholder="150000"
        />
        
        <Input
          label="Target Orders"
          type="number"
          value={campaign.targetOrders}
          onChange={(e) => setCampaign({...campaign, targetOrders: e.target.value})}
          placeholder="50"
        />
      </div>
      
      <Input
        label="Campaign Deadline"
        type="date"
        value={campaign.deadline}
        onChange={(e) => setCampaign({...campaign, deadline: e.target.value})}
      />
      
      <Input
        label="Product Image URL"
        value={campaign.imageUrl}
        onChange={(e) => setCampaign({...campaign, imageUrl: e.target.value})}
        placeholder="https://..."
      />
      
      {/* No preview, no customization options */}
    </FormWrapper>
  );
};
```

### Task 5: Campaign Landing Page (10 hours)
**File**: `/components/CampaignPage.tsx`
```typescript
export const CampaignPage = ({ campaign, onBuy }) => {
  const progress = (campaign.currentOrders / campaign.targetOrders) * 100;
  const daysLeft = Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="space-y-6">
      {/* Hero Section - Product Image */}
      <div className="relative">
        <img 
          src={campaign.imageUrl || '/placeholder.jpg'} 
          alt={campaign.productName}
          className="w-full h-64 object-cover rounded-xl"
        />
        {/* Simple urgency badge */}
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {daysLeft} days left
        </div>
      </div>
      
      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{campaign.productName}</h1>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        <div className="text-3xl font-bold text-red-500">
          Rp {campaign.price.toLocaleString('id-ID')}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">{campaign.currentOrders} orders</span>
          <span className="text-gray-500">Target: {campaign.targetOrders}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        {progress >= 80 && (
          <p className="text-sm text-red-500 font-semibold mt-2">
            🔥 Almost there! Only {campaign.targetOrders - campaign.currentOrders} more needed!
          </p>
        )}
      </div>
      
      {/* Single CTA Button */}
      <button
        onClick={onBuy}
        className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
      >
        Join Group Buy Now
      </button>
      
      {/* Trust Signal */}
      <div className="text-center text-sm text-gray-500">
        ✓ Pay only if target is reached · ✓ 100% refund guarantee
      </div>
    </div>
  );
};
```

### Task 6: Simple Checkout Redirect (6 hours)
**File**: `/components/CheckoutButton.tsx`
```typescript
import { loadStripe } from '@stripe/stripe-js';

export const CheckoutButton = ({ campaignId, amount, email }) => {
  const handleCheckout = async () => {
    // Simple Stripe redirect - no embedded checkout
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaignId,
        amount,
        email
      })
    });
    
    const { sessionId } = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    
    // Redirect to Stripe hosted checkout
    await stripe.redirectToCheckout({ sessionId });
  };
  
  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg"
    >
      Proceed to Payment
    </button>
  );
};
```

---

## Week 3: Viral Mechanics (3 Tasks)

### Task 7: WhatsApp Share Button (6 hours)
**File**: `/components/ShareButton.tsx`
```typescript
export const ShareButton = ({ campaignUrl, campaignName, discount = 10 }) => {
  const shareMessage = encodeURIComponent(
    `🔥 ${campaignName} - Group Buy Deal!\n\n` +
    `Get ${discount}% off when you join!\n` +
    `Limited time only ⏰\n\n` +
    `Join here: ${campaignUrl}`
  );
  
  const whatsappUrl = `https://wa.me/?text=${shareMessage}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg font-semibold"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      Share on WhatsApp
    </a>
  );
};
```

### Task 8: Basic Progress Display (6 hours)
**File**: `/components/ProgressBar.tsx`
```typescript
export const ProgressBar = ({ current, target, showPercentage = true }) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">{current} / {target}</span>
        {showPercentage && (
          <span className="text-gray-500">{Math.round(percentage)}%</span>
        )}
      </div>
      
      <div className="relative w-full bg-gray-200 rounded-full h-4">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Milestone markers at 25%, 50%, 75% */}
        {[25, 50, 75].map(milestone => (
          <div
            key={milestone}
            className="absolute top-0 w-0.5 h-full bg-white"
            style={{ left: `${milestone}%` }}
          />
        ))}
      </div>
      
      {/* Simple milestone messages */}
      {percentage >= 75 && percentage < 100 && (
        <p className="text-sm text-red-500 font-medium">Almost there! 🔥</p>
      )}
      {percentage >= 100 && (
        <p className="text-sm text-green-500 font-medium">Target reached! ✓</p>
      )}
    </div>
  );
};
```

### Task 9: Order Confirmation with Share Prompt (8 hours)
**File**: `/components/OrderConfirmation.tsx`
```typescript
export const OrderConfirmation = ({ order, campaign }) => {
  const referralUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/c/${campaign.id}?ref=${order.id}`;
  
  return (
    <div className="text-center space-y-6 py-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">
          You're #{order.position} in the group buy
        </p>
      </div>
      
      {/* Order Details */}
      <div className="bg-gray-50 rounded-lg p-4 text-left">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Product</span>
            <span className="font-medium">{campaign.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">Rp {order.amount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-yellow-600 font-medium">Pending target</span>
          </div>
        </div>
      </div>
      
      {/* Share Incentive */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
        <p className="font-bold text-red-600 mb-2">
          Share & Save More! 🎁
        </p>
        <p className="text-sm text-gray-600 mb-3">
          Get Rp 10,000 cashback for every friend who joins through your link
        </p>
        <ShareButton 
          campaignUrl={referralUrl}
          campaignName={campaign.productName}
          discount={10}
        />
      </div>
      
      {/* Simple tracking link */}
      <a href={`/orders/${order.id}`} className="text-red-500 underline text-sm">
        Track your order →
      </a>
    </div>
  );
};
```

---

## Week 4: Creator Dashboard (3 Tasks)

### Task 10: Single Campaign View (8 hours)
**File**: `/components/CreatorDashboard.tsx`
```typescript
export const CreatorDashboard = ({ campaign, orders }) => {
  const revenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const shareRate = orders.filter(o => o.hasShared).length / orders.length * 100;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Campaign</h2>
      
      {/* Campaign Status Card */}
      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{campaign.productName}</h3>
            <p className="text-sm text-gray-500">
              Created {new Date(campaign.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {campaign.status}
          </span>
        </div>
        
        <ProgressBar current={orders.length} target={campaign.targetOrders} />
      </Card>
      
      {/* Simple Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-3xl font-bold">{orders.length}</p>
        </Card>
        
        <Card>
          <p className="text-sm text-gray-500 mb-1">Revenue</p>
          <p className="text-2xl font-bold">Rp {revenue.toLocaleString('id-ID')}</p>
        </Card>
      </div>
      
      {/* Recent Orders List */}
      <Card>
        <h3 className="font-semibold mb-3">Recent Orders</h3>
        <div className="space-y-2">
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="flex justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{order.customerEmail}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rp {order.amount.toLocaleString('id-ID')}</p>
                {order.hasShared && (
                  <span className="text-xs text-green-600">Shared ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Campaign Link */}
      <Card>
        <p className="text-sm text-gray-500 mb-2">Your campaign link:</p>
        <div className="flex gap-2">
          <input 
            readOnly 
            value={`${process.env.NEXT_PUBLIC_BASE_URL}/c/${campaign.id}`}
            className="flex-1 px-3 py-2 bg-gray-50 rounded border border-gray-200 text-sm"
          />
          <button 
            onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/c/${campaign.id}`)}
            className="px-4 py-2 bg-red-500 text-white rounded font-medium"
          >
            Copy
          </button>
        </div>
      </Card>
    </div>
  );
};
```

### Task 11: Basic Sales Counter (6 hours)
**File**: `/components/SalesMetrics.tsx`
```typescript
export const SalesMetrics = ({ orders, target }) => {
  const todayOrders = orders.filter(o => 
    new Date(o.createdAt).toDateString() === new Date().toDateString()
  ).length;
  
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const conversionRate = (orders.length / 100).toFixed(1); // Simplified calculation
  
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Today</p>
        <p className="text-2xl font-bold mt-1">{todayOrders}</p>
        <p className="text-xs text-gray-400">orders</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
        <p className="text-2xl font-bold mt-1">{orders.length}/{target}</p>
        <p className="text-xs text-gray-400">orders</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Revenue</p>
        <p className="text-xl font-bold mt-1">
          {(totalRevenue / 1000000).toFixed(1)}M
        </p>
        <p className="text-xs text-gray-400">IDR</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Conv Rate</p>
        <p className="text-2xl font-bold mt-1">{conversionRate}%</p>
        <p className="text-xs text-gray-400">visitors → buyers</p>
      </div>
    </div>
  );
};
```

### Task 12: Mobile Navigation (6 hours)
**File**: `/components/MobileNav.tsx`
```typescript
export const MobileNav = ({ currentPage }) => {
  const pages = [
    { id: 'campaign', label: 'Campaign', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '📊' },
    { id: 'share', label: 'Share', icon: '📤' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {pages.map(page => (
          <a
            key={page.id}
            href={`/${page.id}`}
            className={`flex flex-col items-center py-2 px-4 ${
              currentPage === page.id ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <span className="text-2xl mb-1">{page.icon}</span>
            <span className="text-xs">{page.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};
```

---

## Implementation Timeline

### Week 1 (Foundation)
**Monday-Tuesday**: Design system setup (Task 1)
**Wednesday-Thursday**: Layout components (Task 2)
**Friday**: Form wrapper (Task 3)

### Week 2 (Core Features)
**Monday-Tuesday**: Campaign form (Task 4)
**Wednesday-Thursday**: Campaign page (Task 5)
**Friday**: Checkout integration (Task 6)

### Week 3 (Viral Loop)
**Monday-Tuesday**: WhatsApp sharing (Task 7)
**Wednesday**: Progress displays (Task 8)
**Thursday-Friday**: Order confirmation (Task 9)

### Week 4 (Dashboard & Polish)
**Monday-Tuesday**: Creator dashboard (Task 10)
**Wednesday**: Sales metrics (Task 11)
**Thursday**: Mobile navigation (Task 12)
**Friday**: Testing & deployment

---

## What We're NOT Building

### Eliminated Components (Save 200+ hours)
❌ Theme customization engine
❌ Drag-and-drop builder
❌ Real-time WebSocket updates
❌ Complex animation system
❌ Multi-step wizards
❌ Advanced analytics dashboards
❌ User profile pages
❌ Comment system
❌ Notification center
❌ Search functionality
❌ Filter/sort mechanisms
❌ Image upload with cropping
❌ Rich text editor
❌ Multi-language support
❌ Dark mode toggle
❌ PWA offline features
❌ Push notifications
❌ In-app messaging
❌ Review/rating system
❌ Recommendation engine

### Technology Simplifications
- **State Management**: useState only (no Redux/Zustand)
- **Styling**: Tailwind utility classes (no CSS-in-JS)
- **Forms**: Native HTML5 validation (no Formik/React Hook Form)
- **API**: Simple fetch calls (no GraphQL/tRPC)
- **Testing**: Manual QA checklist (no Jest/Cypress)
- **Build**: Next.js defaults (no custom webpack)
- **Deployment**: Vercel auto-deploy (no CI/CD pipeline)

---

## API Requirements (Minimal)

### Essential Endpoints Only
```typescript
// 6 endpoints total
POST   /api/campaigns          // Create campaign
GET    /api/campaigns/:id       // Get campaign details
POST   /api/orders             // Create order
GET    /api/orders/:creatorId  // Get creator's orders
POST   /api/checkout-session   // Create Stripe session
POST   /api/webhooks/stripe    // Handle payment confirmation
```

### Database Schema (Simplified)
```sql
-- 3 tables only
campaigns (
  id, product_name, price, target_orders, 
  current_orders, deadline, creator_email, status
)

orders (
  id, campaign_id, customer_email, amount, 
  status, referrer_id, created_at
)

shares (
  id, order_id, platform, clicked, created_at
)
```

---

## Success Metrics

### Must Have (Week 4)
✅ Campaign creation < 2 minutes
✅ Purchase completion < 30 seconds
✅ Share action < 5 seconds
✅ Mobile responsive (100%)
✅ Page load < 3 seconds

### Nice to Have (Post-MVP)
- Real-time order updates
- Multiple payment methods
- Email notifications
- Advanced analytics
- A/B testing

---

## Developer Checklist

### Before Starting Each Component
- [ ] Is this absolutely essential for MVP?
- [ ] Can it be simpler?
- [ ] Will it work on mobile?
- [ ] Can it be built in <10 hours?
- [ ] Does it directly impact conversion?

### Definition of Done
- [ ] Component renders on mobile
- [ ] Happy path works
- [ ] Error states show something
- [ ] Can be used by non-technical person
- [ ] Deployed to production

---

## Final Notes

This is NOT about building the perfect platform. This is about proving that Indonesian coffee influencers want group buying functionality. 

**Ship ugly, learn fast, iterate if validated.**

Total development time: 96-120 hours (12 tasks × 8-10 hours)
Total calendar time: 4 weeks
Total components: 12 essential only
Total investment: ~$10,000 (vs. $600,000 original plan)

Remember: Your competitor isn't building the perfect platform either. They're shipping something that works TODAY.