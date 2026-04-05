import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.js';
import publicContentRoutes from './routes/publicContent.js';
import adminContentRoutes from './routes/adminContent.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isAllowedDevOrigin(origin) {
  if (!origin) {
    return true;
  }

  try {
    const url = new URL(origin);
    const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    return isLocalhost;
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (process.env.NODE_ENV === 'production') {
        const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_PROD].filter(Boolean);
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error(`Origin ${origin} not allowed by CORS`));
        return;
      }

      callback(null, isAllowedDevOrigin(origin));
    },
  })
);
app.options('*', cors());
app.use(express.json({ limit: '2mb' }));
app.use('/admin-assets', express.static(path.join(__dirname, 'public')));

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'bonjour-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/content', publicContentRoutes);
app.use('/api/admin', adminContentRoutes);

app.use((error, _req, res, _next) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || 'Unexpected server error',
    ...(process.env.NODE_ENV !== 'production' ? { stack: error.stack } : {}),
  });
});

const port = Number(process.env.PORT || 5000);

async function bootstrap() {
  await connectDb(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
