import { fetchJson } from './api';
import type { GalleryImageContent, HeroSlideContent, MenuItemContent, ReviewContent } from './content';

export function fetchHeroSlides() {
  return fetchJson<HeroSlideContent[]>('/api/content/hero-slides');
}

export function fetchMenuItems() {
  return fetchJson<MenuItemContent[]>('/api/content/menu');
}

export function fetchGalleryImages() {
  return fetchJson<GalleryImageContent[]>('/api/content/gallery');
}

export function fetchReviews() {
  return fetchJson<ReviewContent[]>('/api/content/reviews');
}
