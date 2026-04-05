import { Router } from 'express';
import { Readable } from 'stream';
import { cloudinary, configureCloudinary } from '../config/cloudinary.js';
import { upload } from '../middleware/upload.js';
import { verifyFirebaseToken } from '../middleware/auth.js';
import { HeroSlide } from '../models/HeroSlide.js';
import { MenuItem } from '../models/MenuItem.js';
import { GalleryImage } from '../models/GalleryImage.js';
import { Review } from '../models/Review.js';

const router = Router();
router.use(verifyFirebaseToken);

function getConfiguredCloudinary() {
  configureCloudinary();
  return cloudinary;
}

function uploadBufferToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const configuredCloudinary = getConfiguredCloudinary();
    const uploadStream = configuredCloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

async function deleteCloudinaryImage(publicId) {
  if (!publicId) {
    return;
  }
  try {
    const configuredCloudinary = getConfiguredCloudinary();
    await configuredCloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch (_error) {
    // Best-effort cleanup only.
  }
}

router.post('/upload-image', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'image file is required in form-data under key "image"' });
    }

    const folder = req.body.folder || 'bonjour/admin';
    const uploadResult = await uploadBufferToCloudinary(req.file.buffer, folder);

    return res.status(201).json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    });
  } catch (error) {
    return next(error);
  }
});

function createCrudRoutes(path, Model) {
  router.get(path, async (_req, res, next) => {
    try {
      const items = await Model.find().sort({ order: 1, createdAt: -1 }).lean();
      return res.json(items);
    } catch (error) {
      return next(error);
    }
  });

  router.post(path, async (req, res, next) => {
    try {
      const created = await Model.create(req.body);
      return res.status(201).json(created);
    } catch (error) {
      return next(error);
    }
  });

  router.put(`${path}/:id`, async (req, res, next) => {
    try {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updated) {
        return res.status(404).json({ message: 'Item not found' });
      }

      return res.json(updated);
    } catch (error) {
      return next(error);
    }
  });

  router.delete(`${path}/:id`, async (req, res, next) => {
    try {
      const deleted = await Model.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Item not found' });
      }

      await deleteCloudinaryImage(deleted.cloudinaryPublicId);
      return res.json({ success: true });
    } catch (error) {
      return next(error);
    }
  });
}

createCrudRoutes('/hero-slides', HeroSlide);
createCrudRoutes('/menu-items', MenuItem);
createCrudRoutes('/gallery-images', GalleryImage);
createCrudRoutes('/reviews', Review);

export default router;
