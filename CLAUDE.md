# GOMFLOW: Indonesian Coffee Influencer Group Buying Platform

**Last Updated**: 2025-08-31  
**Status**: MVP Development Phase  
**Next Milestone**: Week 1 Technical Foundation  

---

## 🎯 Executive Summary

### Product Vision
GOMFLOW is a viral group-buying platform designed specifically for Indonesian coffee influencers to monetize their audience through coordinated purchasing campaigns. Influencers create time-limited coffee campaigns, followers unlock discounts through social sharing, and everyone wins through bulk purchasing power.

### Core Value Proposition
- **For Influencers**: Monetize audience without inventory risk, earn 15-20% commission on sales
- **For Followers**: Access exclusive coffee at group discounts (10-30% off retail)
- **For Coffee Suppliers**: Bulk order validation, guaranteed sales, community marketing

### Target Market
**Primary**: Indonesian micro-influencers (1K-10K followers) focused on coffee, lifestyle, or food content
**Geographic Focus**: Jakarta, Bandung, Surabaya (3 major urban centers)
**Market Size**: ~500 coffee influencers, ~2M potential customers

---

## 🚀 MVP Strategy

### What We're Validating
1. **Demand**: Will Indonesian coffee influencers create group buying campaigns?
2. **Engagement**: Will followers participate and share to unlock discounts?
3. **Virality**: Does the share-to-unlock mechanism drive organic growth?
4. **Economics**: Can we achieve 15-20% commission margins sustainably?

### Success Criteria (4-Week Validation)
- **🎯 Primary**: $5,000 total GMV processed
- **📈 Secondary**: 30% of participants share campaigns  
- **👥 Adoption**: 5 successful campaigns completed
- **🔄 Retention**: 1 influencer runs second campaign

### Why This Approach
**Ultra-lean validation** over perfect platform. We're testing human behavior and market demand, not building scalable technology. Every feature deferred until we prove people want this.

---

## 🏗️ Technical Architecture

### Stack (Intentionally Simple)
```
Frontend: Next.js 14 + TypeScript + Tailwind CSS
Backend: Supabase (PostgreSQL + Auth + Edge Functions)
Payments: Stripe Checkout (redirect flow, no custom integration)
Hosting: Vercel (auto-deploy from GitHub)
Communication: WhatsApp Business API for shares
```

### Database Schema (3 tables only)
```sql
influencers: id, email, tiktok_handle, commission_rate, status
campaigns: id, influencer_id, coffee_product, target_quantity, deadline, status
orders: id, campaign_id, customer_email, quantity, amount, shared_status
```

### No Overengineering Principles
- ❌ No microservices, containers, or Kubernetes
- ❌ No real-time WebSockets or complex state management  
- ❌ No mobile apps (PWA sufficient for MVP)
- ❌ No advanced analytics or A/B testing
- ❌ No automated fulfillment (manual processing)
- ❌ No multi-language support (Indonesian only)

---

## 📅 Implementation Plan (4 Weeks, 42 Tasks)

### Week 1: Foundation (14 tasks) - STATUS: 🔴 Not Started
**Goal**: Basic platform functionality

**Technical Setup**
- [TECH-001] Deploy Next.js to Vercel, configure domain
- [TECH-002] Set up Supabase project, create database tables
- [TECH-003] Implement authentication with magic links
- [TECH-004] Integrate Stripe Checkout for payments
- [TECH-005] Build influencer onboarding flow

**Business Setup**
- [BIZ-001] Register Indonesian business entity
- [BIZ-002] Set up business banking and Stripe account
- [BIZ-003] Create legal framework (ToS, Privacy Policy)
- [BIZ-004] Source coffee suppliers (2-3 premium roasters)

**Design Foundation**
- [DESIGN-001] Create minimal design system (colors, fonts, components)
- [DESIGN-002] Design campaign landing page template
- [DESIGN-003] Mobile-first checkout flow
- [DESIGN-004] Influencer dashboard wireframes
- [DESIGN-005] Social sharing components

### Week 2: Purchase Flow (10 tasks) - STATUS: 🔴 Not Started
**Goal**: Complete transaction capability

**Core Features**
- [CORE-001] Campaign creation form for influencers
- [CORE-002] Campaign landing page with product details
- [CORE-003] Quantity selector with dynamic pricing
- [CORE-004] Checkout integration with Stripe
- [CORE-005] Order confirmation and email receipts

**Social Mechanics**  
- [SOCIAL-001] Share-to-unlock discount mechanism
- [SOCIAL-002] WhatsApp sharing integration
- [SOCIAL-003] Progress tracking (orders toward goal)
- [SOCIAL-004] Social proof indicators
- [SOCIAL-005] Campaign success/failure logic

### Week 3: Influencer Tools (10 tasks) - STATUS: 🔴 Not Started
**Goal**: Creator dashboard and campaign management

**Dashboard Features**
- [DASH-001] Campaign performance analytics
- [DASH-002] Order management and customer list
- [DASH-003] Commission tracking and payouts
- [DASH-004] Campaign editing and optimization
- [DASH-005] Share tracking and viral metrics

**Growth Features**
- [GROWTH-001] Referral system for influencer acquisition
- [GROWTH-002] Campaign templates for easy creation
- [GROWTH-003] Best practice guides and onboarding
- [GROWTH-004] Community features (comments, reviews)
- [GROWTH-005] Mobile-optimized experience

### Week 4: Launch & Testing (8 tasks) - STATUS: 🔴 Not Started
**Goal**: Market validation with real campaigns

**Quality Assurance**
- [QA-001] End-to-end testing on mobile devices
- [QA-002] Payment flow validation and error handling
- [QA-003] Social sharing functionality testing
- [QA-004] Performance optimization for 3G networks

**Market Launch**
- [LAUNCH-001] Recruit 10 beta influencers in Jakarta
- [LAUNCH-002] Launch first 3 coffee campaigns
- [LAUNCH-003] Monitor metrics and user feedback
- [LAUNCH-004] Iterate based on real user behavior

---

## 👥 Team Structure (3 People)

### Technical Lead (Full-time, 4 weeks)
**Responsibilities**: All development, deployment, technical decisions
**Skills**: Next.js, TypeScript, Supabase, Stripe integration
**Success Metric**: Platform functional and bug-free by Week 4

### Product/Growth Manager (Full-time, 4 weeks)  
**Responsibilities**: Influencer relations, campaign optimization, user feedback
**Skills**: Indonesian market knowledge, social media marketing, community building
**Success Metric**: 10 influencers onboarded, 5 campaigns launched

### Operations Lead (Part-time, Weeks 3-4)
**Responsibilities**: Coffee sourcing, order fulfillment, customer support
**Skills**: Supply chain, logistics, Indonesian business operations
**Success Metric**: 100% order fulfillment, <24 hour customer response

### Budget: $15,000 total
- Technical Lead: $8,000 (4 weeks @ $2,000/week)
- Product Manager: $4,000 (4 weeks @ $1,000/week) 
- Operations Lead: $2,000 (2 weeks @ $1,000/week)
- Infrastructure: $500 (hosting, tools, legal)
- Marketing: $500 (influencer incentives, ads)

---

## 📊 Success Metrics & Current Status

### Primary KPIs
| Metric | Target | Current | Status |
|--------|---------|---------|---------|
| Total GMV | $5,000 | $0 | 🔴 |
| Campaigns Completed | 5 | 0 | 🔴 |
| Share Rate | 30% | 0% | 🔴 |
| Influencer Acquisition | 10 | 0 | 🔴 |

### Secondary Metrics
| Metric | Target | Current | Status |
|--------|---------|---------|---------|
| Average Order Value | $25 | $0 | 🔴 |
| Campaign Success Rate | 60% | 0% | 🔴 |
| Customer Retention | 20% | 0% | 🔴 |
| Organic Traffic | 40% | 0% | 🔴 |

### Weekly Milestones
- **Week 1**: Platform functional, first influencer onboarded
- **Week 2**: First campaign launched, payment processed
- **Week 3**: 3 active campaigns, sharing mechanism validated  
- **Week 4**: $5,000 GMV achieved, success/failure decision

---

## 📋 Precise Product Brief

### What Exactly Are We Building?
A web platform where Indonesian coffee influencers create time-limited group buying campaigns. Customers get discounts when campaigns hit minimum order thresholds and share socially. Manual fulfillment through partner coffee roasters.

### Core User Flows

**Influencer Flow**:
1. Sign up with TikTok/Instagram verification
2. Create campaign: select coffee product, set minimum quantity (50-100kg), deadline (7 days)
3. Share campaign link on social media
4. Monitor orders and share metrics in dashboard
5. Campaign auto-completes when target hit, earn 15-20% commission

**Customer Flow**:
1. Click influencer's campaign link
2. View product details, current progress toward goal
3. Select quantity (250g, 500g, 1kg bags)
4. Share on WhatsApp/Instagram to unlock 10-15% discount
5. Complete purchase with discounted price
6. Receive coffee within 7-14 days

**Supplier Flow (Manual MVP)**:
1. Receive bulk order notification via email
2. Confirm availability and pricing
3. Roast and package for individual customers
4. Coordinate delivery through logistics partner
5. Receive payment minus platform commission

### Why Will This Succeed?

**Market Timing**: Indonesian coffee culture exploding, influencer economy mature
**Economic Alignment**: Win-win-win for influencers, customers, and suppliers
**Viral Mechanics**: Share-to-unlock creates natural viral loop
**Low Risk Entry**: No inventory, no upfront costs for influencers
**Local Focus**: Indonesian-specific solution, not global platform adaptation

### Minimal Feature Set (MVP)
- ✅ Campaign creation (basic form, product selection)
- ✅ Group purchase mechanics (quantity goals, time limits)
- ✅ Share-to-unlock discounts (WhatsApp integration)
- ✅ Payment processing (Stripe Checkout)
- ✅ Order management (basic dashboard)
- ❌ Advanced analytics (defer)
- ❌ Mobile apps (use PWA)
- ❌ Automated fulfillment (manual process)
- ❌ Multi-currency (IDR only)

---

## 🗺️ Post-MVP Roadmap (Conditional Expansion)

### Phase 2: Scale (If $5K GMV achieved)
**Investment**: $25,000, 6 weeks
- Advanced analytics and campaign optimization
- Automated fulfillment integration
- Mobile app development
- Influencer referral system
- Geographic expansion (5 more cities)

### Phase 3: Platform (If $25K GMV achieved)  
**Investment**: $75,000, 12 weeks
- Multi-category expansion (beauty, fashion)
- White-label solutions for brands
- Advanced creator tools and templates
- International expansion (Malaysia, Thailand)
- Series A fundraising preparation

### Phase 4: Ecosystem (If $100K GMV achieved)
**Investment**: $200,000, 16 weeks
- Full marketplace with multiple suppliers
- Creator economy tools (content, analytics)
- B2B enterprise solutions
- Regional market leadership
- Exit strategy options

---

## 📝 Context Management Instructions

### Daily Updates (During Development)
Update this document at the end of each development day with:

**Format**:
```markdown
## Update [DATE]
**Tasks Completed**: [List completed tasks with IDs]
**Key Learnings**: [What was discovered/learned]
**Blockers**: [Any issues encountered]
**Metrics Update**: [Any new data or progress]
**Next Priority**: [What's next]
**Context Changes**: [Any strategic pivots or updates]
```

### Task Completion Template
When marking tasks complete, add:
```markdown
**[TASK-ID]**: ✅ COMPLETED [DATE]
- **What was built**: [Specific deliverable]
- **Learning**: [Key insight gained]
- **Impact**: [How this affects overall goal]
- **Next**: [What this enables/unlocks]
```

### Weekly Review Template
End of each week, add:
```markdown
## Week [X] Review ([START DATE] - [END DATE])
**Goals Achieved**: [X/Y goals met]
**Key Metrics**: [Updated numbers]
**Major Learnings**: [Important discoveries]
**Strategic Updates**: [Any pivots or changes]
**Week [X+1] Priority**: [Top 3 focus areas]
**Risk Assessment**: [New risks identified]
```

### Pivot Decision Template
If strategy changes:
```markdown
## Strategic Pivot [DATE]
**Previous Strategy**: [What we were doing]
**New Strategy**: [What we're changing to]
**Reason**: [Why we're changing]
**Impact**: [What this means for timeline/budget]
**Updated Success Criteria**: [New targets]
```

---

## 🚨 Critical Context Rules

1. **This document is the single source of truth** for the project
2. **Update after every significant task completion**
3. **All team members must reference before starting work**
4. **Any AI assistant must read this full context first**
5. **Strategic decisions must be recorded here immediately**
6. **Metrics should be updated weekly minimum**
7. **Keep it concise but comprehensive**

---

**Next Immediate Action**: Begin Week 1, Task TECH-001 (Deploy Next.js to Vercel)
**Team Assignment**: Technical Lead starts immediately, Product Manager begins influencer outreach
**Success Gate**: End of Week 1 - Platform functional with first influencer onboarded

---

*This document evolves with the product. Keep it alive, accurate, and actionable.*