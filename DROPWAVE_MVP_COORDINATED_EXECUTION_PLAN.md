# DROPWAVE MVP Coordinated Execution Plan
## 4-Week Sprint to Market Validation

### Executive Command Brief
**Mission**: Launch DROPWAVE MVP in 4 weeks with $45,000 budget and 3-person team
**Objective**: Validate core group-buying mechanics with 5 creators and $5,000 GMV
**Method**: Coordinated specialist task execution with zero overlap and maximum efficiency

---

## 🎯 MVP Principles & Constraints

### Hard Constraints
```yaml
timeline: 4 weeks (28 days)
budget: $45,000 maximum
team_size: 3 people
  - 1 Full-Stack Developer (160 hours)
  - 1 UI/UX Designer (80 hours)
  - 1 Founder/Product Owner (160 hours)

technology_constraints:
  - Use existing services (Vercel, Supabase, Stripe)
  - No custom infrastructure
  - No real-time features (use polling)
  - Single region deployment (Singapore)

success_metrics:
  - 5 successful campaigns completed
  - $5,000 total GMV achieved
  - 30% buyer share rate documented
  - 1 creator requests second campaign
```

### What We're Building (Core Only)
```yaml
essential_features:
  campaign_creation:
    - Single-page form (no wizard)
    - Fixed template (no customization)
    - Basic pricing tiers (3 max)
    - 48-hour deadline only
  
  buyer_experience:
    - Campaign landing page
    - Stripe Checkout redirect
    - WhatsApp share button
    - Progress bar (manual refresh)
  
  creator_dashboard:
    - Single campaign view
    - Order count display
    - Revenue counter
    - Buyer list export
```

### What We're NOT Building (Deferred)
```yaml
deferred_features:
  - Custom themes and branding
  - Real-time WebSocket updates
  - Achievement/gamification system
  - Multi-language support
  - A/B testing framework
  - Analytics dashboard
  - Subscription tiers
  - API marketplace
  - Mobile apps
  - Email automation
```

---

## 👥 Specialist Role Assignments

### System Architect Tasks (Simplified to 8 hours)
```yaml
role: system-architect
allocation: 8 hours total
week: 1 only

tasks:
  setup_infrastructure:
    task: "Configure Vercel + Supabase connection"
    duration: 2 hours
    output: "Deployed Next.js app with DB connection"
    
  database_schema:
    task: "Design minimal 4-table schema"
    tables: [users, campaigns, orders, shares]
    duration: 2 hours
    output: "Supabase migrations file"
    
  payment_architecture:
    task: "Define Stripe Checkout flow"
    duration: 2 hours
    output: "Payment sequence diagram"
    
  deployment_pipeline:
    task: "Setup Vercel auto-deploy from main branch"
    duration: 2 hours
    output: "CI/CD via Vercel GitHub integration"

eliminated_tasks:
  - Kubernetes orchestration (saved 20 hours)
  - Multi-region setup (saved 16 hours)
  - WebSocket architecture (saved 12 hours)
  - Monitoring infrastructure (saved 8 hours)
```

### Backend API Developer Tasks (24 hours)
```yaml
role: backend-api-dev
allocation: 24 hours across weeks 1-2
focus: Essential endpoints only

week_1_tasks:
  auth_endpoints:
    task: "Implement magic link auth"
    endpoints: [/api/auth/login, /api/auth/verify]
    duration: 4 hours
    tech: "Supabase Auth"
    
  campaign_crud:
    task: "Campaign creation and retrieval"
    endpoints: [POST /api/campaigns, GET /api/campaigns/:id]
    duration: 6 hours
    validation: "Basic Zod schemas"

week_2_tasks:
  checkout_integration:
    task: "Stripe Checkout session creation"
    endpoints: [POST /api/checkout/session]
    duration: 4 hours
    scope: "Fixed price only, no dynamic pricing"
    
  order_tracking:
    task: "Order creation and progress calculation"
    endpoints: [POST /api/orders, GET /api/campaigns/:id/progress]
    duration: 4 hours
    note: "Simple percentage calculation"
    
  share_tracking:
    task: "Record and track shares"
    endpoints: [POST /api/shares, GET /api/shares/stats]
    duration: 6 hours
    implementation: "URL parameters, no cookies"

eliminated_endpoints:
  - TikTok OAuth integration (saved 8 hours)
  - Webhook processing (saved 6 hours)
  - Analytics aggregation (saved 8 hours)
  - Subscription management (saved 12 hours)
```

### Component Architect Tasks (32 hours)
```yaml
role: component-architect
allocation: 32 hours across weeks 2-3
focus: Functional components only

week_2_components:
  campaign_form:
    task: "Single-page campaign creation form"
    components: [CampaignForm, PricingTiers, DeadlineSelector]
    duration: 8 hours
    styling: "Tailwind CSS only"
    
  landing_page:
    task: "Campaign landing page"
    components: [HeroSection, ProgressBar, BuyButton, ShareSection]
    duration: 8 hours
    mobile: "Responsive by default"

week_3_components:
  creator_dashboard:
    task: "Basic dashboard view"
    components: [CampaignCard, OrdersList, RevenueDisplay]
    duration: 6 hours
    data: "Client-side fetching"
    
  checkout_flow:
    task: "Checkout redirect handling"
    components: [CheckoutLoader, SuccessPage, SharePrompt]
    duration: 6 hours
    integration: "Stripe redirect flow"
    
  share_mechanism:
    task: "WhatsApp share integration"
    components: [WhatsAppButton, ShareTracker]
    duration: 4 hours
    tracking: "URL parameters"

eliminated_components:
  - Theme customization system (saved 16 hours)
  - Real-time counters (saved 8 hours)
  - Achievement badges (saved 6 hours)
  - Analytics charts (saved 10 hours)
```

### UI Designer Tasks (24 hours)
```yaml
role: ui-designer
allocation: 24 hours in week 1
focus: Essential screens only

design_system:
  task: "Minimal design tokens"
  duration: 4 hours
  deliverables:
    - Color palette (primary, success, error)
    - Typography scale (3 sizes)
    - Spacing system (4 values)
    - Single button style
    
core_screens:
  campaign_creation:
    task: "Campaign form design"
    duration: 4 hours
    deliverable: "Single Figma frame"
    
  campaign_landing:
    task: "Buyer-facing campaign page"
    duration: 6 hours
    deliverable: "Mobile + desktop views"
    
  creator_dashboard:
    task: "Simple dashboard layout"
    duration: 4 hours
    deliverable: "Single responsive design"
    
  success_state:
    task: "Post-purchase share prompt"
    duration: 4 hours
    deliverable: "Share celebration screen"

mobile_optimization:
  task: "Ensure all designs work on mobile"
  duration: 2 hours
  focus: "Indonesian phone screens (360px width)"

eliminated_designs:
  - Onboarding flow (saved 8 hours)
  - Email templates (saved 6 hours)
  - Error states library (saved 4 hours)
  - Loading animations (saved 4 hours)
```

---

## 📅 Week-by-Week Execution Plan

### Week 1: Foundation (Days 1-7)
```yaml
monday:
  morning:
    system_architect: "Setup Vercel + Supabase" (2h)
    ui_designer: "Design system creation" (4h)
    founder: "Recruit first 3 beta creators"
  afternoon:
    backend_dev: "Auth endpoints" (4h)
    ui_designer: "Campaign form design" (4h)
    founder: "Define campaign categories"

tuesday:
  morning:
    system_architect: "Database schema" (2h)
    ui_designer: "Landing page design" (4h)
    backend_dev: "Campaign CRUD" (4h)
  afternoon:
    ui_designer: "Landing page mobile" (2h)
    backend_dev: "Campaign CRUD continued" (2h)
    founder: "Creator interview prep"

wednesday:
  morning:
    system_architect: "Payment architecture" (2h)
    ui_designer: "Dashboard design" (4h)
    founder: "Conduct creator interviews"
  afternoon:
    backend_dev: "Start Stripe integration research"
    ui_designer: "Success state design" (4h)
    founder: "Document creator feedback"

thursday:
  morning:
    system_architect: "Deployment pipeline" (2h)
    ui_designer: "Mobile optimization" (2h)
    backend_dev: "Database setup implementation"
  afternoon:
    full_team: "Week 1 sync and planning" (2h)
    founder: "Refine requirements based on feedback"

friday:
  morning:
    backend_dev: "Complete auth system" (4h)
    component_arch: "Setup Next.js project structure"
    founder: "Prepare test campaign ideas"
  afternoon:
    component_arch: "Install dependencies, setup Tailwind"
    backend_dev: "Test auth flow end-to-end"
    founder: "Lock in 5 beta creators"

weekend_buffer:
  saturday: "Catch up on any delayed tasks"
  sunday: "Rest and prepare for Week 2"
```

### Week 2: Core Functionality (Days 8-14)
```yaml
monday:
  component_arch: "Campaign form component" (8h)
  backend_dev: "Checkout integration" (4h)
  founder: "Create sample campaigns with creators"

tuesday:
  component_arch: "Landing page components" (8h)
  backend_dev: "Order tracking endpoints" (4h)
  founder: "Test checkout flow with test cards"

wednesday:
  component_arch: "Wire up form to API" (4h)
  backend_dev: "Progress calculation logic" (4h)
  founder: "Document user flow issues"

thursday:
  component_arch: "Mobile responsiveness" (4h)
  backend_dev: "Share tracking setup" (4h)
  founder: "Prepare creator onboarding materials"

friday:
  full_team: "Integration testing" (4h)
  founder: "First end-to-end campaign test"
  component_arch: "Bug fixes from testing"

weekend:
  optional: "Polish and minor fixes only"
```

### Week 3: Viral Mechanics (Days 15-21)
```yaml
monday:
  component_arch: "Creator dashboard" (6h)
  backend_dev: "Share tracking endpoints" (6h)
  founder: "Launch first beta campaign"

tuesday:
  component_arch: "Checkout flow components" (6h)
  backend_dev: "Webhook handling for Stripe" (4h)
  founder: "Monitor first campaign, gather feedback"

wednesday:
  component_arch: "WhatsApp integration" (4h)
  backend_dev: "Share analytics endpoint" (4h)
  founder: "Launch second beta campaign"

thursday:
  component_arch: "Success page with share prompt" (4h)
  backend_dev: "Export functionality" (2h)
  founder: "Document viral coefficient data"

friday:
  full_team: "Complete integration test" (6h)
  founder: "Launch remaining beta campaigns"
  component_arch: "Performance optimization"

weekend:
  critical: "Fix any blocking bugs only"
```

### Week 4: Launch & Validation (Days 22-28)
```yaml
monday:
  all: "Production deployment" (2h)
  founder: "Activate all 5 creators"
  dev_team: "Monitor for issues"

tuesday-thursday:
  continuous_monitoring:
    - Real creator campaigns live
    - Track share rates
    - Document conversion funnel
    - Fix critical bugs only
    - Gather user feedback

friday:
  analysis:
    - Calculate final metrics
    - Document learnings
    - Plan iteration priorities
    - Decide on pivot vs proceed

metrics_tracking:
  daily:
    - New campaigns created
    - Orders placed
    - Share button clicks
    - Conversion rates
    - Revenue generated
  
  weekly:
    - Total GMV
    - Average order value
    - Share rate percentage
    - Creator satisfaction
    - Technical debt log
```

---

## 🎯 Success Criteria & Checkpoints

### Daily Standup Format (15 min)
```yaml
structure:
  - What was completed yesterday?
  - What will be done today?
  - Any blockers?
  - Metric update (if applicable)

participants:
  - Full-stack dev
  - Designer (Week 1 only)
  - Founder (daily)
```

### Weekly Checkpoints
```yaml
week_1_checkpoint:
  must_have:
    - Deployed app accessible via URL
    - Database schema implemented
    - Auth system working
    - Designs completed
  nice_to_have:
    - First API endpoint live
    - One creator confirmed

week_2_checkpoint:
  must_have:
    - Campaign creation working
    - Campaign page viewable
    - Stripe checkout functional
    - 3 creators ready
  nice_to_have:
    - Dashboard started
    - Mobile optimized

week_3_checkpoint:
  must_have:
    - Complete flow working
    - Share tracking active
    - Dashboard functional
    - 5 creators onboarded
  nice_to_have:
    - Performance optimized
    - Analytics working

week_4_checkpoint:
  must_have:
    - 5 campaigns launched
    - $5,000 GMV target
    - 30% share rate
    - No critical bugs
  success_indicators:
    - Creator requests second campaign
    - Organic buyer sharing observed
    - Positive creator feedback
    - Technical stability achieved
```

---

## 🚫 Scope Creep Prevention

### Automatic Rejections
```yaml
reject_immediately:
  - "Can we add [any feature] real quick?"
  - "The competitors have [feature]"
  - "What if we made it customizable?"
  - "Can we integrate with [platform]?"
  - "We need analytics for [metric]"
  
standard_response: "Great idea for v2. Let's table it until we validate the core."
```

### Change Request Protocol
```yaml
if_change_requested:
  1. What does this replace? (must remove something)
  2. How does this help reach $5K GMV faster?
  3. Can it wait until Week 5?
  
if_any_answer_is_unclear:
  decision: "Defer to post-MVP"
```

---

## 💰 Budget Allocation

### Development Costs (Weeks 1-4)
```yaml
personnel:
  full_stack_dev: $15,000 (160 hours @ $94/hr)
  ui_designer: $4,000 (80 hours @ $50/hr)
  founder: $0 (sweat equity)
  subtotal: $19,000

infrastructure:
  vercel: $20/month (Pro plan)
  supabase: $25/month (Pro plan)
  stripe: 2.9% + $0.30 per transaction
  domain: $15/year
  subtotal: $500

creator_incentives:
  beta_creator_bonuses: $5,000 (5 × $1,000)
  first_campaign_subsidies: $5,000
  marketing_materials: $1,000
  subtotal: $11,000

contingency:
  unexpected_costs: $14,500
  total_budget: $45,000
```

### Post-MVP Budget (Weeks 5-8)
```yaml
if_successful:
  scale_testing: $15,000
  feature_development: $20,000
  creator_acquisition: $10,000
  
if_pivot_needed:
  reserve_for_iteration: $45,000
```

---

## 📊 Metrics Dashboard

### Real-Time Tracking (Manual)
```yaml
daily_metrics:
  campaigns_created: counter
  orders_placed: counter
  total_gmv: sum
  shares_clicked: counter
  
calculated_metrics:
  conversion_rate: orders / visitors
  share_rate: shares / orders
  average_order_value: gmv / orders
  campaign_success_rate: completed / created
  
creator_metrics:
  activation_rate: launched / signed_up
  repeat_rate: second_campaign / first_campaign
  satisfaction_score: survey_results
```

### Decision Gates
```yaml
gate_1_day_14:
  question: "Is the core mechanic working?"
  metrics:
    - At least 1 successful campaign
    - >20% buyer-to-share conversion
    - Creator can complete flow independently
  if_yes: Continue to Week 3
  if_no: Pivot the user flow

gate_2_day_21:
  question: "Is there viral potential?"
  metrics:
    - >30% share rate sustained
    - Organic traffic from shares
    - Positive creator feedback
  if_yes: Continue to Week 4
  if_no: Adjust viral mechanics

gate_3_day_28:
  question: "Should we scale or pivot?"
  metrics:
    - $5,000 GMV achieved
    - 5 campaigns completed
    - 1 creator wants to continue
    - CAC < LTV indication
  if_yes: Proceed to growth phase
  if_no: Analyze and iterate
```

---

## 🚀 Launch Sequence

### Day 22-28 Operational Plan
```yaml
monday_day_22:
  09:00: "Deploy to production"
  10:00: "Verify all systems operational"
  11:00: "First creator launches campaign"
  14:00: "Monitor initial traffic"
  17:00: "Fix any critical issues"

tuesday_to_thursday:
  continuous:
    - Monitor campaigns
    - Track metrics hourly
    - Fix bugs immediately
    - Document user behavior
    - Gather feedback actively

friday_day_26:
  morning: "Final metrics compilation"
  afternoon: "Team retrospective"
  evening: "Go/No-go decision"

weekend:
  rest: "Team recovery"
  planning: "Next phase preparation"
```

---

## ✅ Final Specialist Alignment

### Coordination Protocol
```yaml
communication:
  daily: "15-min standup at 9 AM SGT"
  weekly: "1-hour sync on Fridays"
  emergency: "WhatsApp group for blockers"
  documentation: "Single shared Notion"

handoffs:
  designer_to_dev: "Figma links by Week 1 end"
  backend_to_frontend: "API docs in Swagger"
  dev_to_founder: "Staging URL for testing"
  founder_to_dev: "User feedback in GitHub issues"

conflict_resolution:
  principle: "Simplest solution wins"
  tiebreaker: "Founder decides"
  documentation: "Log decision rationale"
```

### Success Commitment
```yaml
team_agreement:
  - No feature additions without removing something
  - Daily progress visible to all
  - Blockers raised within 2 hours
  - Quality bar: "Works on Indonesian phones"
  - Launch date: Non-negotiable

individual_commitments:
  full_stack_dev: "I will ship working code daily"
  ui_designer: "I will deliver all designs by Week 1"
  founder: "I will have 5 creators ready by Week 3"
```

---

## 🎯 The Bottom Line

**We are building a $45,000 experiment, not a $620,000 platform.**

Every task, every hour, every dollar must directly contribute to answering one question:
**"Will Indonesian creators use group buying to sell?"**

If the answer is yes, we'll have 6 months of runway to build the platform properly.
If the answer is no, we'll have saved $575,000 and 12 weeks.

**Ship ugly. Learn fast. Iterate faster.**

---

*This plan is law. Deviations require written justification and majority team agreement.*