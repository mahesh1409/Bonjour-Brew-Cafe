import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    caption: { type: String, trim: true, default: '' },
    imageUrl: { type: String, required: true, trim: true },
    cloudinaryPublicId: { type: String, default: '', trim: true },
    order: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
