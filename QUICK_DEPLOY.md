# Quick Deployment Reference

**Time to Deploy:** 15-20 minutes  
**Required Accounts:** GitHub, Vercel, Render  
**Required Credentials:** Firebase, MongoDB Atlas, Cloudinary

---

## Step 1: GitHub (2 min)

```powershell
cd d:\bonjour
git add .
git commit -m "Bonjour - Ready for production"
git push origin main
```

---

## Step 2: Backend on Render (5 min)

1. Go to [render.com](https://render.com) → Sign in with GitHub
2. Click **New ➕** → **Web Service**
3. Select `bonjour` repo → **Connect**
4. Fill settings:
   - Name: `bonjour-backend`
   - Region: Closest to you
   - Build: `cd backend && npm install`
   - Start: `cd backend && npm start`
5. **Environment Variables** (add these):

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=http://localhost:5174
FRONTEND_URL_PROD=https://your-vercel-url.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bonjour?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
ADMIN_EMAIL=your-email@example.com
```

6. Click **Create Web Service** → Wait for "✓ Running"
7. Copy backend URL: `https://bonjour-backend.onrender.com`

---

## Step 3: Frontend on Vercel (5 min)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **Add New** → **Project**
3. Import `bonjour` repo
4. Settings confirm defaults (Vite auto-detected)
5. **Environment Variables** (add these):

```
VITE_API_BASE_URL=https://bonjour-backend.onrender.com
VITE_FIREBASE_API_KEY=AIzaSyAmvoOOphafnk0Jcv6qRl9oNBHKxmq7Xl4
VITE_FIREBASE_AUTH_DOMAIN=bonjour-brew-cafe.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bonjour-brew-cafe
VITE_FIREBASE_STORAGE_BUCKET=bonjour-brew-cafe.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=48527336887
VITE_FIREBASE_APP_ID=1:48527336887:web:e0f5c80a1f9b5068087432
```

6. Click **Deploy** → Wait for "✓ Ready"
7. Copy frontend URL from deployment

---

## Step 4: Update Backend CORS (2 min)

Backend needs to know your Vercel URL:

1. Go to Render → `bonjour-backend` → **Environment**
2. Update `FRONTEND_URL_PROD=https://[your-vercel-url].vercel.app`
3. **Save** → Render auto-redeploys

---

## Step 5: Test (2 min)

1. Open frontend: `https://your-vercel-url.vercel.app`
2. Go to `/admin`
3. Try login (Firebase email)
4. Add test menu item with image
5. Check `/menu` to see it listed with category filter

✅ If all works → **LIVE!**

---

## URLs

| Service | URL |
|---------|-----|
| Frontend | `https://bonjour-[hash].vercel.app` |
| Backend API | `https://bonjour-backend.onrender.com` |
| Admin Dashboard | `https://bonjour-[hash].vercel.app/admin` |
| Health Check | `https://bonjour-backend.onrender.com/api/health` |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page | Check `VITE_API_BASE_URL` matches backend URL |
| Login fails | Check Firebase config in Vercel env vars |
| Images don't upload | Verify Cloudinary keys in Render env vars |
| CORS error | Update backend `FRONTEND_URL_PROD` in Render |
| Backend won't start | Check Render logs for MongoDB connection error |

---

## Updates (Automatic)

Just push code to GitHub:
```powershell
git add .
git commit -m "Your message"
git push origin main
```

Both Render & Vercel auto-deploy within 2-3 minutes.

---

## More Details

See **DEPLOYMENT.md** for full step-by-step guide with screenshots.

---

**Status:** ✅ Ready to Deploy  
**Last Updated:** April 5, 2026
