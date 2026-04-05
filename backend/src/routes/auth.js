import { Router } from 'express';
import { initializeFirebaseAdmin } from '../config/firebaseAdmin.js';

const router = Router();

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'token is required' });
    }

    const admin = initializeFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(token);

    return res.json({
      valid: true,
      uid: decoded.uid,
      email: decoded.email || null,
      name: decoded.name || null,
      picture: decoded.picture || null,
    });
  } catch (error) {
    if (error.message && error.message.includes('Firebase credentials are missing')) {
      return res.status(500).json({ valid: false, message: error.message });
    }
    return res.status(401).json({ valid: false, message: 'Invalid token', details: error.message });
  }
});

export default router;
