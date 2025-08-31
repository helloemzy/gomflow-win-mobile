# DROPWAVE MVP Infrastructure - Week 1 Setup
## Single Developer, 8 Essential Tasks, Zero Complexity

### Reality Check
You don't need AWS, Kubernetes, or complex CI/CD. You need a working product that validates the business model. Everything else is premature optimization.

---

## Week 1: Infrastructure Tasks (8 Tasks Total)

### Day 1: Core Setup (2 tasks, 4 hours)

#### Task 1: Vercel Deployment Setup
**Time**: 1 hour
**What You're Doing**:
```bash
# 1. Create Vercel account (free tier)
# 2. Install Vercel CLI
npm i -g vercel

# 3. Deploy existing Next.js app
vercel --prod

# That's it. No load balancers, no Kubernetes, no auto-scaling.
```

**What You're NOT Doing**:
- ❌ Setting up AWS ECS/Fargate
- ❌ Configuring multi-AZ architecture
- ❌ Creating CloudFront distributions
- ❌ Setting up monitoring dashboards

#### Task 2: Supabase Project Setup
**Time**: 3 hours
**What You're Doing**:
```sql
-- 1. Create Supabase account (free tier)
-- 2. Create new project
-- 3. Create these 3 tables ONLY:

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  target_amount DECIMAL NOT NULL,
  deadline TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  buyer_email TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- That's it. No analytics tables, no themes, no notifications.
```

**What You're NOT Doing**:
- ❌ Setting up read replicas
- ❌ Configuring PgBouncer
- ❌ Creating 15+ tables
- ❌ Implementing complex indexes
- ❌ Setting up materialized views

---

### Day 2: Payment & Auth (2 tasks, 4 hours)

#### Task 3: Stripe Checkout Integration
**Time**: 2 hours
**What You're Doing**:
```javascript
// 1. Create Stripe account
// 2. Get API keys
// 3. Install stripe package
npm install stripe

// 4. Create ONE endpoint for checkout
app.post('/api/create-checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'idr',
        product_data: { name: req.body.campaign_title },
        unit_amount: req.body.amount * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/campaign/${req.body.campaign_id}`,
  });
  
  res.json({ url: session.url });
});

// That's it. No Stripe Connect, no instant payouts, no subscriptions.
```

**What You're NOT Doing**:
- ❌ Implementing Stripe Connect marketplace
- ❌ Building custom payment forms
- ❌ Setting up recurring subscriptions
- ❌ Creating payout systems
- ❌ Multi-currency support

#### Task 4: Magic Link Authentication
**Time**: 2 hours
**What You're Doing**:
```javascript
// Use Supabase Auth - it's already included
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
});

// That's it. No OAuth, no JWT complexity, no session management.
```

**What You're NOT Doing**:
- ❌ TikTok OAuth integration
- ❌ Custom JWT implementation
- ❌ Complex session management
- ❌ Role-based access control
- ❌ Two-factor authentication

---

### Day 3: Essential Services (2 tasks, 3 hours)

#### Task 5: Environment Variables Setup
**Time**: 1 hour
**What You're Doing**:
```bash
# Create .env.local file with 6 variables:
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
STRIPE_SECRET_KEY=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-webhook-secret
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
SMTP_FROM=noreply@yourdomain.com

# Add to Vercel dashboard
vercel env add

# That's it. No AWS Secrets Manager, no HashiCorp Vault.
```

#### Task 6: Basic Email Notifications
**Time**: 2 hours
**What You're Doing**:
```javascript
// Use Vercel's built-in email or Supabase email
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  await resend.emails.send({
    from: 'noreply@dropwave.app',
    to,
    subject,
    html,
  });
}

// Send 2 emails only:
// 1. Magic link login
// 2. Order confirmation
// That's it. No complex templates, no email campaigns.
```

**What You're NOT Doing**:
- ❌ Setting up SendGrid/Mailgun
- ❌ Creating email template systems
- ❌ Building email queues
- ❌ Implementing email analytics
- ❌ Creating drip campaigns

---

### Day 4: Deployment & Monitoring (2 tasks, 3 hours)

#### Task 7: Simple Deployment Pipeline
**Time**: 1 hour
**What You're Doing**:
```yaml
# Vercel auto-deploys from main branch
# That's your CI/CD pipeline

# Optional: Add basic build check
# .github/workflows/check.yml
name: Build Check
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build

# That's it. No complex pipelines, no staging environments.
```

**What You're NOT Doing**:
- ❌ Setting up Jenkins/CircleCI
- ❌ Creating complex deployment stages
- ❌ Implementing blue-green deployments
- ❌ Setting up rollback mechanisms
- ❌ Creating infrastructure as code

#### Task 8: Minimal Monitoring
**Time**: 2 hours
**What You're Doing**:
```javascript
// 1. Use Vercel Analytics (free)
// 2. Use Supabase Dashboard (built-in)
// 3. Add one error tracking service

// Install Sentry (free tier)
npm install @sentry/nextjs

// Add to your app
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

// 4. Create a simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// That's it. Check Vercel logs when something breaks.
```

**What You're NOT Doing**:
- ❌ Setting up DataDog/New Relic
- ❌ Creating Grafana dashboards
- ❌ Implementing distributed tracing
- ❌ Setting up ELK stack
- ❌ Creating custom metrics

---

## Cost Breakdown

### Month 1 Costs (MVP Phase)
- **Vercel**: $0 (Hobby plan)
- **Supabase**: $0 (Free tier - 500MB database, 50K auth users)
- **Stripe**: 2.9% + 30¢ per transaction
- **Email**: $0 (100 emails/day free with Resend)
- **Domain**: $12/year
- **Error Tracking**: $0 (Sentry free tier)

**Total Infrastructure Cost**: $1/month

### When to Scale (Only After Validation)
Scale ONLY when you hit these milestones:
- ✅ 50+ successful campaigns completed
- ✅ $50,000+ in GMV processed
- ✅ 500+ active creators
- ✅ Consistent 20% week-over-week growth

Then consider:
- Vercel Pro ($20/month)
- Supabase Pro ($25/month)
- Dedicated email service ($50/month)

---

## What Success Looks Like in Week 1

### ✅ Completed Checklist
- [ ] Website accessible at dropwave.vercel.app
- [ ] Users can sign up with email
- [ ] Creators can create a campaign
- [ ] Buyers can complete checkout
- [ ] Money flows through Stripe
- [ ] Basic error tracking works
- [ ] You can see user activity in Supabase

### ❌ What You DON'T Need in Week 1
- Real-time features (use page refresh)
- Perfect performance (3-second load is fine)
- Scalability (10 concurrent users is enough)
- Complex monitoring (Vercel logs are sufficient)
- Automated testing (manual QA is faster)
- Multiple environments (production only)
- API documentation (you're the only developer)

---

## Infrastructure Decision Tree

```
Do you have paying customers?
├─ NO → Use free tiers for everything
└─ YES → Are you making >$10K/month?
    ├─ NO → Stay on free/hobby tiers
    └─ YES → Are you growing >50% monthly?
        ├─ NO → Upgrade to paid tiers ($50/month total)
        └─ YES → NOW consider proper infrastructure
```

---

## Emergency Fixes (When Things Break)

### "The site is down!"
1. Check Vercel dashboard → Redeploy
2. Check Supabase status → Wait or contact support
3. Still broken? → Revert last commit

### "Payments aren't working!"
1. Check Stripe dashboard for errors
2. Check webhook logs in Stripe
3. Test with Stripe test mode

### "Users can't log in!"
1. Check Supabase Auth logs
2. Verify email service is working
3. Send test magic link manually

### "It's too slow!"
1. Don't optimize yet
2. If critical: Add `loading` states
3. If really critical: Upgrade Vercel

---

## The Golden Rule

**Every hour spent on infrastructure is an hour not spent talking to users.**

Your MVP infrastructure should take 1 day to set up, not 1 week. If you're spending more than 8 hours on infrastructure in Week 1, you're over-engineering.

Remember: Dropbox started as a video demo. Airbnb started by manually posting on Craigslist. Your infrastructure doesn't need to be perfect - it needs to exist.

---

## Week 2-4 Focus

After Week 1 infrastructure is done:
- Week 2: Build core features (campaign creation, checkout)
- Week 3: Add viral mechanics (sharing, referrals)
- Week 4: Launch with 5 beta creators

Infrastructure tasks in Week 2-4: ZERO. 

Only exception: If something is literally broken and preventing sales.

---

## Scaling Checklist (Only After $50K GMV)

When you ACTUALLY need to scale:
1. Upgrade Vercel to Pro ($20/month)
2. Upgrade Supabase to Pro ($25/month)
3. Add CDN for images (Cloudflare $20/month)
4. Add proper monitoring (DataDog $31/month)
5. Add staging environment (duplicate setup)
6. Implement caching layer (Redis)
7. Add load testing (k6.io)
8. Consider AWS migration (if >$500K GMV)

Until then: **Keep it simple. Ship fast. Learn faster.**