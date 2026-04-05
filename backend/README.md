# Bonjour Backend

Backend for admin-managed content:
- Follow Our Journey images
- Menu items
- Hero scrolling images
- Reviews

Tech stack:
- Login/Auth: Firebase (ID token verification)
- Image storage: Cloudinary
- Database: MongoDB Atlas (Mongoose)

## 1) Setup

Install dependencies:

```bash
cd backend
npm i
```

Create env file:

```bash
cp .env.example .env
```

Fill all values in `.env`:
- `MONGODB_URI`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Firebase service account credentials
- Optional `ADMIN_EMAILS` (comma-separated)

Run backend:

```bash
npm run dev
```

Default URL: `http://localhost:5000`

## 2) Admin Screen

Open:

- `http://localhost:5000/admin`

This screen lets you:
- Login with Firebase email/password
- Upload image to Cloudinary
- Add hero slides, gallery images, menu items, and reviews

## 3) API Overview

Public content:
- `GET /api/content/home`
- `GET /api/content/menu`
- `GET /api/content/gallery`
- `GET /api/content/reviews`

Auth:
- `POST /api/auth/verify` with `{ token }`

Admin (requires Firebase Bearer token):
- `POST /api/admin/upload-image` (form-data `image`, optional `folder`)
- `GET/POST /api/admin/hero-slides`
- `PUT/DELETE /api/admin/hero-slides/:id`
- `GET/POST /api/admin/gallery-images`
- `PUT/DELETE /api/admin/gallery-images/:id`
- `GET/POST /api/admin/menu-items`
- `PUT/DELETE /api/admin/menu-items/:id`
- `GET/POST /api/admin/reviews`
- `PUT/DELETE /api/admin/reviews/:id`

## 4) Notes

- Upload returns `url` and `publicId`; store both in admin forms.
- Deleting content attempts Cloudinary cleanup using `cloudinaryPublicId`.
- For production, set strict `FRONTEND_URL` and keep service account private.
