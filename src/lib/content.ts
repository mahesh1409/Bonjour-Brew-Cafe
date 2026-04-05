import heroImage1 from '../imports/image.jpeg';
import heroImage2 from '../imports/image2.jpeg';
import heroImage3 from '../imports/image3.jpeg';
import heroImage4 from '../imports/image4.jpeg';
import heroImage5 from '../imports/image5.jpeg';
import heroImage6 from '../imports/image6.jpeg';

export interface HeroSlideContent {
  _id?: string;
  title?: string;
  imageUrl: string;
  order?: number;
}

export interface MenuItemContent {
  _id?: string;
  name: string;
  description?: string;
  price: number | string;
  category: string;
  imageUrl: string;
  order?: number;
}

export interface GalleryImageContent {
  _id?: string;
  caption?: string;
  imageUrl: string;
  order?: number;
}

export interface ReviewContent {
  _id?: string;
  name: string;
  role?: string;
  rating: number;
  message: string;
  avatarUrl?: string;
  order?: number;
}

export const fallbackHeroSlides: HeroSlideContent[] = [
  { imageUrl: heroImage1 },
  { imageUrl: heroImage2 },
  { imageUrl: heroImage3 },
  { imageUrl: heroImage4 },
  { imageUrl: heroImage5 },
  { imageUrl: heroImage6 },
];

export const fallbackMenuItems: MenuItemContent[] = [
  {
    _id: 'local-1',
    name: 'Classic Latte',
    description: 'Smooth espresso with steamed milk',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1604298507224-0c982bab0795?w=400',
    category: 'Coffee',
  },
  {
    _id: 'local-2',
    name: 'Cappuccino',
    description: 'Rich espresso topped with foam',
    price: 160,
    imageUrl: 'https://images.unsplash.com/photo-1769775529747-107551aec610?w=400',
    category: 'Coffee',
  },
  {
    _id: 'local-3',
    name: 'Iced Coffee',
    description: 'Refreshing cold brew perfection',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1769398449496-2414ea88b441?w=400',
    category: 'Cold Coffee',
  },
  {
    _id: 'local-4',
    name: 'Cookies & Cream',
    description: 'Freshly baked chocolate chip cookies',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1652365283468-c507a8fc0dd8?w=400',
    category: 'Cookies',
  },
  {
    _id: 'local-5',
    name: 'Pastries',
    description: 'Assorted fresh pastries daily',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1738036968926-fbcd5ee11e9c?w=400',
    category: 'Snacks',
  },
  {
    _id: 'local-6',
    name: 'Mocha Delight',
    description: 'Chocolate and espresso fusion',
    price: 220,
    imageUrl: 'https://images.unsplash.com/photo-1647011643777-fe4d21e32f26?w=400',
    category: 'Coffee',
  },
];

export const fallbackGalleryImages: GalleryImageContent[] = [
  { _id: 'local-g1', caption: 'Cafe vibes', imageUrl: 'https://images.unsplash.com/photo-1767298045382-3d6e64016c03?w=400' },
  { _id: 'local-g2', caption: 'Warm interior', imageUrl: 'https://images.unsplash.com/photo-1642229398672-77ae42e62ee6?w=400' },
  { _id: 'local-g3', caption: 'Brewing moments', imageUrl: 'https://images.unsplash.com/photo-1655312106151-80d0b5551b4f?w=400' },
  { _id: 'local-g4', caption: 'Cafe corner', imageUrl: 'https://images.unsplash.com/photo-1749996089724-268703b8c4dc?w=400' },
  { _id: 'local-g5', caption: 'Fresh pour', imageUrl: 'https://images.unsplash.com/photo-1606757870492-9fc7cf1e736d?w=400' },
  { _id: 'local-g6', caption: 'Community table', imageUrl: 'https://images.unsplash.com/photo-1770991934935-4bdc95292f61?w=400' },
  { _id: 'local-g7', caption: 'Detail shot', imageUrl: 'https://images.unsplash.com/photo-1611410256680-aea172db6498?w=400' },
  { _id: 'local-g8', caption: 'Daily moments', imageUrl: 'https://images.unsplash.com/photo-1726735351449-a2ef847a15ae?w=400' },
  { _id: 'local-g9', caption: 'Coffee story', imageUrl: 'https://images.unsplash.com/photo-1763943430987-b371ccd20503?w=400' },
];

export const fallbackReviews: ReviewContent[] = [
  {
    _id: 'local-r1',
    name: 'Priya Sharma',
    role: 'Regular Customer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    message: 'The ambiance is cozy, the coffee is perfect, and the staff is so welcoming. My favorite spot in Ambernath!',
    rating: 5,
  },
  {
    _id: 'local-r2',
    name: 'Rahul Mehta',
    role: 'Coffee Enthusiast',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    message: 'Best latte art I\'ve seen! The quality is consistently amazing, and the cookies are to die for.',
    rating: 5,
  },
  {
    _id: 'local-r3',
    name: 'Ananya Desai',
    role: 'Local Foodie',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    message: 'Everything under ₹349 and still premium quality? Bonjour Brew is a gem. Highly recommend!',
    rating: 5,
  },
  {
    _id: 'local-r4',
    name: 'Vikram Singh',
    role: 'Student',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    message: 'Perfect place to study or hang out with friends. Great WiFi, amazing coffee, and super affordable!',
    rating: 5,
  },
];

export function formatPrice(price: number | string) {
  return typeof price === 'number' ? `₹${price}` : price;
}
