# GOMFLOW - Indonesian Coffee Group Buying Platform

🚀 **Status**: MVP Development Phase - Week 1 Technical Foundation  
💰 **Goal**: $5,000 GMV validation in 4 weeks  
🌍 **Market**: Jakarta, Bandung, Surabaya coffee influencers  

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Environment Setup
1. Copy `.env.local` and configure Supabase credentials
2. Follow `SUPABASE_SETUP.md` for database setup
3. Run development server: `http://localhost:3000`

### Deployment
- **Production**: Auto-deployed to Vercel on push to `main`
- **Preview**: Auto-deployed for all pull requests

## Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Payments**: Stripe Checkout
- **Hosting**: Vercel

## MVP Features
- [x] Next.js project setup with TypeScript and Tailwind
- [x] Supabase database schema (3 tables)
- [x] Vercel deployment configuration
- [ ] Magic link authentication
- [ ] Stripe payment integration
- [ ] Campaign creation flow
- [ ] Share-to-unlock mechanism
- [ ] WhatsApp sharing integration

## Success Criteria (4 weeks)
- $5,000 total GMV processed
- 5 successful campaigns completed
- 30% of participants share campaigns
- 10 influencers onboarded

---

Built with ☕ for Indonesian coffee lovers