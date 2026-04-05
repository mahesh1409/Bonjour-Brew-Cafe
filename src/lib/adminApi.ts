import { API_BASE_URL } from './api';

export interface HeroSlideAdmin {
  _id: string;
  title?: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  order?: number;
  isActive?: boolean;
}

export interface MenuItemAdmin {
  _id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  imageUrl: string;
  cloudinaryPublicId?: string;
  order?: number;
  isActive?: boolean;
}

export interface GalleryImageAdmin {
  _id: string;
  caption?: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  order?: number;
  isActive?: boolean;
}

export interface ReviewAdmin {
  _id: string;
  name: string;
  role?: string;
  message: string;
  rating: number;
  avatarUrl?: string;
  cloudinaryPublicId?: string;
  order?: number;
  isActive?: boolean;
}

async function request<T>(path: string, token: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }

  return payload as T;
}

export const adminApi = {
  verifyToken(token: string) {
    return fetch(`${API_BASE_URL}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }).then(async (res) => {
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload?.message || 'Token verification failed');
      }
      return payload;
    });
  },

  uploadImage(token: string, file: File, folder: string) {
    const body = new FormData();
    body.append('image', file);
    body.append('folder', folder);

    return request<{ url: string; publicId: string }>(`/api/admin/upload-image`, token, {
      method: 'POST',
      body,
    });
  },

  listHeroSlides(token: string) {
    return request<HeroSlideAdmin[]>(`/api/admin/hero-slides`, token);
  },

  createHeroSlide(token: string, data: Omit<HeroSlideAdmin, '_id'>) {
    return request<HeroSlideAdmin>(`/api/admin/hero-slides`, token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  deleteHeroSlide(token: string, id: string) {
    return request<{ success: true }>(`/api/admin/hero-slides/${id}`, token, { method: 'DELETE' });
  },

  listMenuItems(token: string) {
    return request<MenuItemAdmin[]>(`/api/admin/menu-items`, token);
  },

  createMenuItem(token: string, data: Omit<MenuItemAdmin, '_id'>) {
    return request<MenuItemAdmin>(`/api/admin/menu-items`, token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  deleteMenuItem(token: string, id: string) {
    return request<{ success: true }>(`/api/admin/menu-items/${id}`, token, { method: 'DELETE' });
  },

  listGalleryImages(token: string) {
    return request<GalleryImageAdmin[]>(`/api/admin/gallery-images`, token);
  },

  createGalleryImage(token: string, data: Omit<GalleryImageAdmin, '_id'>) {
    return request<GalleryImageAdmin>(`/api/admin/gallery-images`, token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  deleteGalleryImage(token: string, id: string) {
    return request<{ success: true }>(`/api/admin/gallery-images/${id}`, token, { method: 'DELETE' });
  },

  listReviews(token: string) {
    return request<ReviewAdmin[]>(`/api/admin/reviews`, token);
  },

  createReview(token: string, data: Omit<ReviewAdmin, '_id'>) {
    return request<ReviewAdmin>(`/api/admin/reviews`, token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  deleteReview(token: string, id: string) {
    return request<{ success: true }>(`/api/admin/reviews/${id}`, token, { method: 'DELETE' });
  },
};
