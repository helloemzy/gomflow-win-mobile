# DROPWAVE MVP Design Requirements
## 20-Hour Part-Time Designer Constraint

### Executive Summary
Design requirements optimized for **immediate MVP validation** with minimal design overhead. Focus: conversion-first, mobile-native, single template approach that can be executed in 20 hours across 4 weeks.

**Core Principle**: Ship functional design fast, iterate based on real user behavior.

---

## 🎯 Design Constraints & Guardrails

### Hard Constraints
- **Total Time**: 20 hours over 4 weeks (5 hours/week)
- **Team**: 1 part-time designer
- **Scope**: Single fixed template (no customization system)
- **Priority**: Conversion > aesthetics
- **Platform**: Mobile-first (90% mobile traffic expected)

### What We're NOT Building
- ❌ Multiple theme options
- ❌ Advanced customization system  
- ❌ Complex animations
- ❌ Detailed brand identity
- ❌ Marketing materials
- ❌ Custom illustrations
- ❌ Desktop-optimized layouts

### Success Criteria
- ✅ Clear user flow that converts
- ✅ Mobile-native interface
- ✅ Trust-building visual elements
- ✅ Shareable campaign pages
- ✅ Zero design-related conversion blockers

---

## 📅 4-Week Design Sprint

### Week 1: Foundation (6 hours)
**Deliverable**: Basic design system and mobile wireframes

#### Tasks:
**1. Minimal Color System (1 hour)**
```css
/* Single brand palette - no variations */
primary: #FF6B35    /* High-energy orange for CTAs */
secondary: #1A1A1A  /* Text and headers */
success: #22C55E    /* Progress bars, success states */
error: #EF4444      /* Error messages */
background: #FAFAFA /* Page background */
card: #FFFFFF       /* Campaign cards */
border: #E5E5E5     /* Subtle dividers */
```

**2. Typography Hierarchy (1 hour)**
```css
/* Single font family: Inter (web safe) */
h1: 32px/1.2, bold   /* Campaign titles */
h2: 24px/1.3, semibold /* Section headers */
body: 16px/1.5, regular /* Main text */
caption: 14px/1.4, regular /* Helper text */
button: 16px/1, semibold /* CTA text */
```

**3. Button System (1 hour)**
- Primary: Full-width orange, 48px height (thumb-friendly)
- Secondary: White outline, orange border
- Disabled: Gray with reduced opacity
- Loading state: Spinner overlay

**4. Mobile Grid Layout (2 hours)**
- 16px side margins
- 24px vertical spacing between sections
- Full-width campaign cards
- Sticky CTA footer for checkout

**5. Basic Component Sketches (1 hour)**
- Campaign hero section
- Progress bar design
- Order counter display
- Share button placement

**Week 1 Output**: Figma file with 5 core screens wireframed

---

### Week 2: Core User Flows (8 hours)
**Deliverable**: High-fidelity mockups of essential screens

#### Tasks:
**1. Campaign Landing Page Design (3 hours)**
```
Mobile Layout (375px):
┌─────────────────────────┐
│ [PRODUCT IMAGE]         │ ← Full width hero
│ Campaign Title          │ ← 32px bold
│ By Creator Name         │ ← 16px regular
├─────────────────────────┤
│ [PROGRESS BAR]          │ ← Visual progress
│ 47 of 100 ordered      │ ← Large counter
│ 3 days remaining       │ ← Urgency timer
├─────────────────────────┤
│ Product Description     │ ← Key details only
│ ₹2,499 (₹3,000 regular)│ ← Pricing
├─────────────────────────┤
│ [BUY NOW - ORANGE]      │ ← Primary CTA
│ [SHARE THIS CAMPAIGN]   │ ← Secondary CTA
└─────────────────────────┘
```

**Focus Areas:**
- Hero image optimization for mobile
- Clear value proposition placement
- Progress visualization that creates urgency
- Social proof elements (basic)
- Trust signals (creator verification badge)

**2. Campaign Creation Form (2 hours)**
```
Simple Single-Page Form:
- Product title (required)
- Target quantity (dropdown: 50, 100, 200, 500)
- Duration (dropdown: 7, 14, 30 days)
- Price (number input)
- Product image upload
- Description (textarea)
- WhatsApp for updates (checkbox)

Layout: Vertical stack, full-width inputs
Submit: "Launch Campaign" orange button
```

**3. Checkout Flow Screens (2 hours)**
- Order summary screen
- Payment form (Stripe elements)
- Success confirmation
- Share prompt after purchase

**4. Basic Dashboard Layout (1 hour)**
- Single campaign view only
- Orders count + revenue
- Basic campaign stats
- "Share Campaign" prominent button

**Week 2 Output**: 8 high-fidelity mobile screens

---

### Week 3: Trust & Viral Elements (4 hours)
**Deliverable**: Trust signals and sharing optimizations

#### Tasks:
**1. Trust-Building Visual Elements (2 hours)**
- Creator verification badge design
- "Secure payment" indicators
- Order counter with real buyer count
- "Recently joined" ticker design
- Refund policy visual treatment

**2. Sharing Optimization Design (2 hours)**
```
Share Button Hierarchy:
1. WhatsApp (primary - 80% of traffic)
2. Instagram Stories
3. Copy Link
4. Generic share

Share Card Design:
┌─────────────────────────┐
│ [PRODUCT IMAGE]         │
│ "I just backed this!"   │
│ Campaign Title          │
│ 47/100 backed • 3 days │
│ [JOIN ME - CTA]         │
└─────────────────────────┘
```

**Week 3 Output**: Trust elements + sharing templates

---

### Week 4: Polish & Validation (2 hours)
**Deliverable**: Launch-ready assets and testing support

#### Tasks:
**1. Final Visual Polish (1 hour)**
- Loading state designs
- Error message styling  
- Empty state illustrations (simple)
- Icon selection and sizing

**2. Launch Support Assets (1 hour)**
- Design QA checklist
- Mobile viewport testing guide
- Basic usability checklist for founders
- Handoff notes for developer

**Week 4 Output**: Production-ready design system

---

## 🎨 Design System Specifications

### Mobile-First Approach
**Target Screen Size**: 375px (iPhone baseline)
**Breakpoint Strategy**: Mobile-only for MVP
**Touch Targets**: Minimum 44px height
**Thumb Zone**: CTAs in bottom 25% of screen

### Performance Constraints
**Image Requirements**:
- Hero images: Max 800px width, WebP format
- File size: <200KB per image
- Lazy loading compatible
- 2x retina support

### Accessibility Minimums
- Color contrast: 4.5:1 for text
- Focus indicators on all interactive elements
- Alt text for all images
- Touch targets >44px

---

## 🔄 Design-Development Handoff

### Assets Provided
1. **Figma file** with all screens
2. **CSS variables** for colors/typography
3. **Component specifications** (padding, margins)
4. **Icon library** (minimal, web-safe)
5. **Image guidelines** and examples

### Developer Requirements
- Use Tailwind CSS with custom config
- Implement mobile-responsive breakpoints
- Follow component naming from Figma
- Maintain 48px minimum button heights

---

## 📊 Design Success Metrics

### Conversion Metrics to Track
- Campaign page bounce rate (target: <60%)
- CTA click-through rate (target: >15%)
- Share button engagement (target: >30%)
- Mobile checkout completion (target: >70%)

### Design Quality Gates
- All screens render correctly on iPhone/Android
- No horizontal scrolling on mobile
- All CTAs easily thumb-reachable
- Load time <3 seconds on 3G

---

## ⚠️ What Gets Deferred

### Post-MVP Design Work
- Desktop optimizations
- Theme customization system
- Advanced animations
- Creator branding tools
- A/B testing variations
- Marketing page design
- Email template design

### Only Add After PMF Validation
- Multiple color schemes
- Advanced customization
- Seasonal themes
- Enterprise features
- International localization

---

## 🎯 Design Tasks by Week Summary

### Week 1 (6h): Foundation
- [2h] Color system + typography
- [2h] Button styles + mobile grid  
- [2h] Core wireframes

### Week 2 (8h): Core Screens  
- [3h] Campaign landing page
- [2h] Creation form
- [2h] Checkout flow
- [1h] Basic dashboard

### Week 3 (4h): Trust + Viral
- [2h] Trust elements design
- [2h] Share mechanics design

### Week 4 (2h): Launch Ready
- [1h] Polish + states
- [1h] QA + handoff

**Total: 20 hours exactly**

---

## 🚀 Immediate Next Steps

1. **Designer onboards**: Review product brief + user flows
2. **Week 1 kickoff**: Start with color system + wireframes
3. **Developer sync**: Align on component structure
4. **Weekly checkpoints**: 30min reviews to stay on track

**Remember**: This is validation design, not perfection design. Ship fast, learn faster, iterate based on real user behavior.

**Success = functional flows that convert, not design awards.**