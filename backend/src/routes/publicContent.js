import { Router } from 'express';
import { HeroSlide } from '../models/HeroSlide.js';
import { MenuItem } from '../models/MenuItem.js';
import { GalleryImage } from '../models/GalleryImage.js';
import { Review } from '../models/Review.js';

const router = Router();

router.get('/home', async (_req, res, next) => {
  try {
    const [heroSlides, menuItems, galleryImages, reviews] = await Promise.all([
      HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean(),
      MenuItem.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean(),
      GalleryImage.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Review.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    return res.json({
      heroSlides,
      menuItems,
      galleryImages,
      reviews,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/hero-slides', async (_req, res, next) => {
  try {
    const heroSlides = await HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    return res.json(heroSlides);
  } catch (error) {
    return next(error);
  }
});

router.get('/menu', async (_req, res, next) => {
  try {
    const menuItems = await MenuItem.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    return res.json(menuItems);
  } catch (error) {
    return next(error);
  }
});

router.get('/gallery', async (_req, res, next) => {
  try {
    const galleryImages = await GalleryImage.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    return res.json(galleryImages);
  } catch (error) {
    return next(error);
  }
});

router.get('/reviews', async (_req, res, next) => {
  try {
    const reviews = await Review.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    return res.json(reviews);
  } catch (error) {
    return next(error);
  }
});

export default router;
