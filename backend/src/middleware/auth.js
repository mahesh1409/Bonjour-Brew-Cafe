import { initializeFirebaseAdmin } from '../config/firebaseAdmin.js';

function getAdminEmails() {
  if (!process.env.ADMIN_EMAILS) {
    return [];
  }
  return process.env.ADMIN_EMAILS.split(',').map((email) => email.trim().toLowerCase()).filter(Boolean);
}

export async function verifyFirebaseToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Missing Firebase Bearer token' });
    }

    const admin = initializeFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(token);

    const adminEmails = getAdminEmails();
    if (adminEmails.length > 0) {
      const email = (decoded.email || '').toLowerCase();
      if (!adminEmails.includes(email)) {
        return res.status(403).json({ message: 'Forbidden: email is not allowed for admin access' });
      }
    }

    req.user = decoded;
    return next();
  } catch (error) {
    if (error.message && error.message.includes('Firebase credentials are missing')) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(401).json({ message: 'Invalid or expired Firebase token', details: error.message });
  }
}
