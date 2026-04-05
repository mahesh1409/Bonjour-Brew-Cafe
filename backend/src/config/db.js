import mongoose from 'mongoose';

export async function connectDb(uri) {
  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  if (uri.includes('<db_password>')) {
    throw new Error('MONGODB_URI still contains <db_password>. Replace it with your real MongoDB Atlas database user password.');
  }

  const commonOptions = {
    dbName: 'bonjour',
    serverSelectionTimeoutMS: 15000,
  };

  try {
    await mongoose.connect(uri, commonOptions);
    return;
  } catch (error) {
    const isSrvLookupIssue = String(error?.code || '').includes('ECONNREFUSED') || String(error?.message || '').includes('querySrv');
    const fallbackUri = process.env.MONGODB_FALLBACK_URI;

    if (isSrvLookupIssue && fallbackUri) {
      if (fallbackUri.includes('<db_password>')) {
        throw new Error('MONGODB_FALLBACK_URI still contains <db_password>. Replace it with your real MongoDB Atlas database user password.');
      }

      await mongoose.connect(fallbackUri, commonOptions);
      return;
    }

    throw error;
  }
}
