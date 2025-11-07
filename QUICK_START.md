# Quick Start Guide - Deploy to Vercel

## ✅ Your app is ready to deploy!

All the necessary files have been configured for Vercel deployment.

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy to Vercel

```bash
vercel
```

Follow the prompts:

- **Link to existing project?** → No
- **Project name** → tutor-platform (or your choice)
- **Directory** → ./ (current directory)

### 4. Set Environment Variables

After first deployment, go to Vercel Dashboard:

1. Open your project
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

   **MONGODB_URI**

   ```
   mongodb+srv://your-username:your-password@cluster.mongodb.net/tutordb?retryWrites=true&w=majority
   ```

   (Use your actual MongoDB Atlas connection string)

   **CORS_ORIGIN** (Optional)

   ```
   https://your-project.vercel.app
   ```

   (Your Vercel deployment URL)

### 5. Redeploy

After adding environment variables, redeploy:

```bash
vercel --prod
```

Or trigger a redeploy from the Vercel dashboard.

## 📝 Important Notes

1. **MongoDB Atlas**: Make sure your MongoDB Atlas IP whitelist allows all IPs (`0.0.0.0/0`) or Vercel's IP ranges

2. **API Routes**: All API calls will automatically work in production - no code changes needed!

3. **Local Development**: Still works the same way:

   ```bash
   cd backend
   node server.js
   ```

4. **Automatic Deployments**: If you connect to GitHub, Vercel will auto-deploy on every push

## 🧪 Testing Your Deployment

After deployment, test:

- ✅ Browse tutors (public)
- ✅ Sign up as tutor
- ✅ Sign up as parent
- ✅ Login
- ✅ Add favorites
- ✅ Rate tutors
- ✅ Edit profiles

## 🆘 Troubleshooting

**API calls failing?**

- Check environment variables in Vercel dashboard
- Verify MongoDB connection string
- Check Vercel function logs

**CORS errors?**

- Ensure CORS_ORIGIN includes your Vercel URL
- Check server.js CORS configuration

**MongoDB connection issues?**

- Verify IP whitelist in MongoDB Atlas
- Check connection string format
- Ensure database user permissions

## 📚 More Details

See `DEPLOYMENT.md` for comprehensive deployment guide.
