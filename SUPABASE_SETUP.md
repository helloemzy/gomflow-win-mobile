# GOMFLOW Supabase Setup Guide

## Quick Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Fill in:
   - **Name**: `gomflow-mvp`
   - **Database Password**: (generate strong password)
   - **Region**: Asia Southeast (Singapore) - closest to Indonesia
5. Click "Create new project"

### 2. Configure Database
1. Wait for project creation (~2 minutes)
2. Go to "SQL Editor" in the sidebar
3. Copy contents of `database-schema.sql` file
4. Paste into SQL Editor
5. Click "RUN" to create all tables and policies

### 3. Get Project Credentials
1. Go to "Settings" → "API"
2. Copy the following values:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Project API Key (anon/public)**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Update Environment Variables
1. Open `.env.local` file in project root
2. Replace placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 5. Test Connection
1. Restart Next.js development server: `npm run dev`
2. Open browser console on `http://localhost:3001`
3. Run: `console.log('Supabase configured:', window.supabase !== undefined)`
4. Should return `true`

## Database Schema Overview

### Tables Created
- **influencers**: Store influencer profiles and commission rates
- **campaigns**: Coffee group buying campaigns with targets and deadlines  
- **orders**: Customer orders with payment and sharing status

### Key Features
- UUID primary keys for security
- Automated timestamps with update triggers
- Row Level Security (RLS) enabled
- Optimized indexes for performance
- Foreign key constraints for data integrity

## Authentication Setup (Next Step)
After database setup, authentication will be configured to:
- Enable magic link login for influencers
- Secure API access with JWT tokens
- Implement proper RLS policies
- Handle user sessions and state

## Estimated Setup Time: 5-10 minutes

---

**Next Action**: Once Supabase is configured, proceed with Vercel deployment and authentication implementation.