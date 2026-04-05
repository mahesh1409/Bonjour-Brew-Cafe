# Bonjour Brew Café - Deployment Guide

Complete step-by-step guide to deploy frontend on **Vercel** and backend on **Render**.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Post-Deployment Setup](#post-deployment-setup)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Ensure you have:
- ✅ GitHub account
- ✅ Vercel account (sign up with GitHub)
- ✅ Render account (sign up with GitHub)
- ✅ MongoDB Atlas connection string
- ✅ Cloudinary API credentials
- ✅ Firebase project configured

### Get Required Credentials

#### Firebase Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Settings** (gear icon) → **Service Accounts**
3. Click **Generate New Private Key**
4. Save the JSON file content (you'll paste this later)

#### Cloudinary API Keys
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Note your **Cloud Name**, **API Key**, and **API Secret**

---

## GitHub Setup

### 1.1 Create GitHub Repository

```powershell
cd d:\bonjour
git init
git add .
git commit -m "Bonjour Brew Cafe - Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/bonjour.git
git branch -M main
git push -u origin main
```

### 1.2 Verify Repository Structure

```
bonjour/
├── src/                    # React frontend
├── backend/                # Node.js backend
├── package.json            # Frontend dependencies
├── vite.config.ts          # Vite config
├── .env.example            # Frontend env template
├── backend/.env.example    # Backend env template
└── README.md
```

---

## Backend Deployment (Render)

### 2.1 Create Render Account & Web Service

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **New ➕** → **Web Service**
4. Select your `bonjour` repository → **Connect**

### 2.2 Configure Web Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `bonjour-backend` |
| **Region** | Select closest to you |
| **Branch** | `main` |
| **Runtime** | Node |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && npm start` |
| **Auto-Deploy** | Yes |

### 2.3 Add Environment Variables

In Render dashboard, go to **Settings** → **Environment** and add:

```
NODE_ENV=production
PORT=5000

FRONTEND_URL=http://localhost:5174
FRONTEND_URL_PROD=https://your-vercel-url.vercel.app

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bonjour?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key":"..."}

ADMIN_EMAIL=your-admin-email@example.com
```

**⚠️ FIREBASE_SERVICE_ACCOUNT_KEY:** Paste the entire JSON string from Firebase (no line breaks)

### 2.4 Deploy Backend

Click **Create Web Service**

Render will auto-deploy. Check **Logs** tab for status.

**Your backend URL:** `https://bonjour-backend.onrender.com`

### 2.5 Test Backend Health

```powershell
Invoke-WebRequest -Uri "https://bonjour-backend.onrender.com/api/health"
```

Expected response: `{"ok": true, "service": "bonjour-backend"}`

---

## Frontend Deployment (Vercel)

### 3.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Select your `bonjour` repository → **Import**

### 3.2 Configure Project Settings

| Setting | Value |
|---------|-------|
| **Project Name** | `bonjour` |
| **Framework** | Vite (auto-detected) |
| **Root Directory** | `.` (root) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Node Version** | 20 |

### 3.3 Add Environment Variables

Click **Environment Variables** and add:

```
VITE_API_BASE_URL=https://bonjour-backend.onrender.com

VITE_FIREBASE_API_KEY=AIzaSyAmvoOOphafnk0Jcv6qRl9oNBHKxmq7Xl4
VITE_FIREBASE_AUTH_DOMAIN=bonjour-brew-cafe.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bonjour-brew-cafe
VITE_FIREBASE_STORAGE_BUCKET=bonjour-brew-cafe.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=48527336887
VITE_FIREBASE_APP_ID=1:48527336887:web:e0f5c80a1f9b5068087432
```

**Note:** Use Firebase config from your Firebase console

### 3.4 Deploy Frontend

Click **Deploy**

Vercel will build and deploy automatically.

**Your frontend URL:** `https://bonjour-[hash].vercel.app` (custom domain available)

---

## Post-Deployment Setup

### 4.1 Update Backend CORS

Your Vercel URL has been assigned. Now update backend to recognize it:

1. Go to Render dashboard → `bonjour-backend` settings
2. Update **Environment Variables**:
   - `FRONTEND_URL_PROD=https://bonjour-[your-domain].vercel.app`
3. **Save** → Render will auto-redeploy

### 4.2 Update Frontend API URL

If backend URL differs from default:

1. Go to Vercel → Settings → Environment Variables
2. Update `VITE_API_BASE_URL=https://bonjour-backend.onrender.com`
3. Redeploy from **Deployments** tab

### 4.3 Test Admin Login

1. Open frontend: `https://bonjour-[your-domain].vercel.app/admin`
2. Try logging in with Firebase admin account
3. Check browser console for errors (F12)

---

## Testing

### 5.1 Frontend Tests

**❌ Blank page?**
- Check browser console (F12) for API errors
- Verify `VITE_API_BASE_URL` is correctly set
- Hard refresh (Ctrl+Shift+R)

**❌ Login fails?**
- Check Firebase config in Vercel env vars
- Verify backend `/api/auth/verify` endpoint works:
  ```powershell
  Invoke-WebRequest -Uri "https://bonjour-backend.onrender.com/api/health"
  ```

### 5.2 Backend Tests

**❌ Render deployment fails?**
- Check **Logs** tab in Render
- Verify all env variables are set
- Test MongoDB connection string:
  ```
  mongodb+srv://username:password@cluster.mongodb.net
  ```

**❌ CORS errors?**
- Check browser console for CORS error message
- Verify `FRONTEND_URL_PROD` matches your Vercel domain exactly
- No trailing slashes!

### 5.3 Happy Path Test

1. ✅ Open `https://your-domain.vercel.app`
2. ✅ /admin login works
3. ✅ Add menu item (with image upload)
4. ✅ Menu displays on /menu with categories
5. ✅ Images load from Cloudinary
6. ✅ Gallery works

---

## Troubleshooting

### Common Issues

#### "Cannot GET /admin" on Frontend
Your frontend is working but `/admin` route not found.
- ✅ Ensure React version supports SPA routing
- ✅ Vercel serves `dist/index.html` for unknown routes (auto-configured)

#### API 503 Errors
Backend might still be spinning up (Render free tier).
- ⏳ Wait 2-3 minutes after deployment
- ✅ Check Render logs for startup errors

#### Images Not Loading (Cloudinary)
- ✅ Verify Cloudinary credentials in backend env
- ✅ Ensure Cloudinary folder exists: `bonjour/admin/menu/`
- ✅ Check Cloudinary console for uploaded images

#### "Origin not allowed by CORS"
- ✅ Frontend URL must exactly match `FRONTEND_URL_PROD`
- ✅ No trailing slashes: `https://bonjour-xyz.vercel.app` ✓
- ✅ Verify deploy completed in both Render & Vercel

#### Login Token Verification Fails
Firebase configuration mismatch:
- ✅ Backend `FIREBASE_SERVICE_ACCOUNT_KEY` is valid JSON
- ✅ Frontend Firebase config matches backend project
- ✅ Admin email exists in Firebase Authentication

---

## Rollback & Updates

### Update Backend Code

```powershell
cd d:\bonjour
git add .
git commit -m "Backend fix: description here"
git push origin main
```

Render auto-deploys from GitHub. Check **Logs** tab.

### Update Frontend Code

```powershell
git add .
git commit -m "Frontend fix: description here"
git push origin main
```

Vercel auto-deploys. Check **Deployments** tab.

### Rollback to Previous Version

**Vercel:**
- Go to **Deployments** → Find previous build → Click three dots → **Promote to Production**

**Render:**
- Go to **Events** → Find successful deployment → Click **Redeploy**

---

## Environment Variable Reference

### Frontend (.env)
```
VITE_API_BASE_URL=https://bonjour-backend.onrender.com
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=12345...
VITE_FIREBASE_APP_ID=1:12345:web:abc...
```

### Backend (.env)
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=http://localhost:5174
FRONTEND_URL_PROD=https://your-vercel-domain.vercel.app
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FIREBASE_SERVICE_ACCOUNT_KEY={...}
ADMIN_EMAIL=admin@example.com
```

---

## Support

### Useful Links
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Dashboard](https://cloudinary.com/console)

### Quick Checks
1. ✅ GitHub repo has latest code
2. ✅ Render logs show "listening on port 5000"
3. ✅ Vercel build shows "✓ Ready"
4. ✅ Backend health endpoint returns 200
5. ✅ Frontend loads without console errors

---

**Deployment Status:** Ready for production ✅
**Last Updated:** April 5, 2026
