# Deployment Guide for Vercel

This guide will help you deploy your tutor platform to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account (you already have this)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository

1. Make sure all your code is committed to Git
2. Push to GitHub/GitLab/Bitbucket

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy:

   ```bash
   vercel
   ```

4. Follow the prompts:

   - Link to existing project? **No**
   - Project name: **tutor-platform** (or your choice)
   - Directory: **./** (current directory)
   - Override settings? **No**

5. For production deployment:
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your Git repository
4. Configure project settings (see below)

## Step 3: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

1. **MONGODB_URI**

   - Value: Your MongoDB Atlas connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/tutordb?retryWrites=true&w=majority`

2. **CORS_ORIGIN** (Optional)

   - Value: Your Vercel deployment URL
   - Example: `https://your-project.vercel.app`

3. **NODE_ENV**
   - Value: `production`

## Step 4: Verify Deployment

1. Visit your Vercel deployment URL
2. Test signup functionality
3. Test login functionality
4. Test tutor browsing

## Important Notes

- **API Routes**: All API calls will automatically use the same domain in production
- **MongoDB**: Make sure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs) or Vercel's IP ranges
- **CORS**: The server is configured to accept requests from your Vercel domain
- **Environment Variables**: Never commit `.env` files to Git

## Troubleshooting

### API calls failing

- Check that environment variables are set correctly
- Verify MongoDB Atlas connection string
- Check Vercel function logs in the dashboard

### CORS errors

- Ensure `CORS_ORIGIN` includes your Vercel URL
- Check that the origin function in `backend/server.js` allows your domain

### MongoDB connection issues

- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has proper permissions

## Local Development

To test locally with the same setup:

1. Keep using `npm run dev` in the backend folder
2. The frontend will automatically use `localhost:3001` for API calls
3. Make sure your `.env` file has `MONGODB_URI` set

## Updating Your Deployment

After making changes:

1. Commit and push to Git
2. Vercel will automatically redeploy
3. Or use `vercel --prod` to manually deploy

## Custom Domain

To use a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `CORS_ORIGIN` environment variable if needed
