import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, trim: true, default: 'INR' },
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    cloudinaryPublicId: { type: String, default: '', trim: true },
    order: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
