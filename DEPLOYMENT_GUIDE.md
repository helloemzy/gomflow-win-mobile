# GOMFLOW Vercel Deployment Guide

## Quick Deployment (5 minutes)

### Option 1: GitHub + Vercel (Recommended)
1. **Push to GitHub**:
   ```bash
   # Create new GitHub repository called 'gomflow-mvp'
   git remote add origin https://github.com/[username]/gomflow-mvp.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key
   - Click "Deploy"

### Option 2: Direct CLI Deployment
```bash
# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# ? Set up and deploy "gomflow-win"? Y
# ? Which scope? [Your account]
# ? Link to existing project? N
# ? What's your project's name? gomflow-mvp
# ? In which directory is your code located? ./

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Redeploy with environment variables
vercel --prod
```

## Post-Deployment Checklist

### ✅ Verify Deployment
1. Visit your Vercel URL (e.g., `gomflow-mvp.vercel.app`)
2. Check homepage loads with GOMFLOW branding
3. Verify responsive design on mobile
4. Test build logs show no errors

### ✅ Configure Custom Domain (Optional)
1. In Vercel dashboard → Domains
2. Add custom domain: `gomflow.com` or `gomflow.id`
3. Configure DNS records as instructed
4. Enable HTTPS (automatic)

### ✅ Setup Monitoring
1. Enable Vercel Analytics
2. Configure error tracking
3. Set up uptime monitoring

## Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase public API key

## Auto-Deployment Setup
Once connected to GitHub:
- **Production**: Auto-deploys from `main` branch
- **Preview**: Auto-deploys from feature branches
- **Domain**: Uses Vercel subdomain or custom domain

## Expected Results
- ✅ GOMFLOW landing page live and accessible
- ✅ Mobile-responsive design
- ✅ Fast loading times (<2s)
- ✅ SEO meta tags configured
- ✅ Environment variables configured
- ✅ Ready for authentication implementation

**Estimated Time**: 5-10 minutes  
**Next Step**: Implement magic link authentication

---

🚀 **Deploy URL will be**: `https://gomflow-mvp-[random].vercel.app`