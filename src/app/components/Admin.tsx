import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { adminApi, type GalleryImageAdmin, type HeroSlideAdmin, type MenuItemAdmin, type ReviewAdmin } from '../../lib/adminApi';
import { firebaseAuth, isFirebaseConfigured } from '../../lib/firebase';

type AdminTab = 'hero' | 'gallery' | 'menu' | 'reviews';

const MENU_CATEGORIES = [
  'CROISSANT',
  'BURGER',
  'FRIES',
  'SALAD',
  'PIZZA',
  'SPAGHETTI',
  'SOURDOUGH',
  'SANDWICH',
  'WRAP',
  'PASTA',
  'WINTER SPECIAL BOWL',
  'SOUP',
  'DESERT',
];

export function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('Not logged in');
  const [isBusy, setIsBusy] = useState(false);

  const [heroSlides, setHeroSlides] = useState<HeroSlideAdmin[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImageAdmin[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemAdmin[]>([]);
  const [reviews, setReviews] = useState<ReviewAdmin[]>([]);

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [menuFile, setMenuFile] = useState<File | null>(null);
  const [reviewFile, setReviewFile] = useState<File | null>(null);

  const [heroForm, setHeroForm] = useState({ title: '' });
  const [galleryForm, setGalleryForm] = useState({ caption: '' });
  const [menuForm, setMenuForm] = useState({ name: '', description: '', category: '', price: 0 });
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', message: '', rating: 5 });
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');

  const canUseFirebase = isFirebaseConfigured && Boolean(firebaseAuth);
  const tabs: Array<{ id: AdminTab; label: string }> = [
    { id: 'hero', label: 'Hero Slides' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
  ];

  async function refreshAll(currentToken: string) {
    const [hero, gallery, menu, review] = await Promise.all([
      adminApi.listHeroSlides(currentToken),
      adminApi.listGalleryImages(currentToken),
      adminApi.listMenuItems(currentToken),
      adminApi.listReviews(currentToken),
    ]);
    setHeroSlides(hero);
    setGalleryImages(gallery);
    setMenuItems(menu);
    setReviews(review);
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    refreshAll(token).catch((error: Error) => {
      setStatus(error.message);
    });
  }, [token]);

  async function handleLogin() {
    if (!canUseFirebase || !firebaseAuth) {
      setStatus('Firebase is not configured. Add VITE_FIREBASE_* values in frontend .env.');
      return;
    }

    setIsBusy(true);
    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const idToken = await credential.user.getIdToken(true);
      await adminApi.verifyToken(idToken);
      setToken(idToken);
      setActiveTab('hero');
      setStatus(`Logged in as ${credential.user.email}`);
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleLogout() {
    if (firebaseAuth) {
      await signOut(firebaseAuth);
    }
    setToken('');
    setActiveTab('hero');
    setStatus('Logged out');
  }

  async function uploadImage(file: File, folder: string) {
    if (!token) {
      throw new Error('Login first.');
    }

    return adminApi.uploadImage(token, file, folder);
  }

  async function createHeroSlide() {
    if (!token) return;
    if (!heroFile) {
      setStatus('Choose a hero image first.');
      return;
    }

    setIsBusy(true);
    try {
      const uploaded = await uploadImage(heroFile, 'bonjour/admin/hero');
      await adminApi.createHeroSlide(token, {
        title: heroForm.title,
        imageUrl: uploaded.url,
        cloudinaryPublicId: uploaded.publicId,
        isActive: true,
      });
      await refreshAll(token);
      setHeroForm({ title: '' });
      setHeroFile(null);
      setStatus('Hero slide uploaded and added');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setIsBusy(false);
    }
  }

  async function createGalleryImage() {
    if (!token) return;
    if (!galleryFile) {
      setStatus('Choose a gallery image first.');
      return;
    }

    setIsBusy(true);
    try {
      const uploaded = await uploadImage(galleryFile, 'bonjour/admin/gallery');
      await adminApi.createGalleryImage(token, {
        caption: galleryForm.caption,
        imageUrl: uploaded.url,
        cloudinaryPublicId: uploaded.publicId,
        isActive: true,
      });
      await refreshAll(token);
      setGalleryForm({ caption: '' });
      setGalleryFile(null);
      setStatus('Gallery image uploaded and added');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setIsBusy(false);
    }
  }

  async function createMenuItem() {
    if (!token) return;
    if (!menuFile) {
      setStatus('Choose a menu image first.');
      return;
    }

    setIsBusy(true);
    try {
      const uploaded = await uploadImage(menuFile, 'bonjour/admin/menu');
      await adminApi.createMenuItem(token, {
        name: menuForm.name,
        description: menuForm.description,
        category: menuForm.category,
        price: menuForm.price,
        imageUrl: uploaded.url,
        cloudinaryPublicId: uploaded.publicId,
        isActive: true,
      });
      await refreshAll(token);
      setMenuForm({ name: '', description: '', category: '', price: 0 });
      setMenuFile(null);
      setStatus('Menu item uploaded and added');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setIsBusy(false);
    }
  }

  async function createReview() {
    if (!token) return;
    if (!reviewFile) {
      setStatus('Choose a review avatar first.');
      return;
    }

    setIsBusy(true);
    try {
      const uploaded = await uploadImage(reviewFile, 'bonjour/admin/reviews');
      await adminApi.createReview(token, {
        name: reviewForm.name,
        role: reviewForm.role,
        message: reviewForm.message,
        rating: reviewForm.rating,
        avatarUrl: uploaded.url,
        cloudinaryPublicId: uploaded.publicId,
        isActive: true,
      });
      await refreshAll(token);
      setReviewForm({ name: '', role: '', message: '', rating: 5 });
      setReviewFile(null);
      setStatus('Review uploaded and added');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setIsBusy(false);
    }
  }

  async function deleteItem(kind: AdminTab, id: string) {
    if (!token) return;
    setIsBusy(true);
    try {
      if (kind === 'hero') await adminApi.deleteHeroSlide(token, id);
      if (kind === 'gallery') await adminApi.deleteGalleryImage(token, id);
      if (kind === 'menu') await adminApi.deleteMenuItem(token, id);
      if (kind === 'reviews') await adminApi.deleteReview(token, id);
      await refreshAll(token);
      setStatus('Item deleted');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cream-beige)' }}>
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="heading-font text-3xl md:text-4xl" style={{ color: 'var(--coffee-brown)' }}>
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage hero images, gallery, menu, and reviews.</p>
            </div>
            <a
              href="/"
              className="px-6 py-3 rounded-full text-white text-center"
              style={{ backgroundColor: 'var(--coffee-brown)' }}
            >
              Back To Website
            </a>
          </div>
        </div>

        {!token && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-7">
            <h2 className="heading-font text-2xl mb-4" style={{ color: 'var(--coffee-brown)' }}>Login</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded-xl px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="border rounded-xl px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button disabled={isBusy} onClick={handleLogin} className="px-6 py-3 rounded-full text-white" style={{ backgroundColor: 'var(--coffee-brown)' }}>
                Login
              </button>
            </div>
            <p className="text-sm mt-3" style={{ color: token ? '#1f7a1f' : '#555' }}>{status}</p>
          </div>
        )}

        {token && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-4 md:p-5 mb-6 overflow-x-auto">
              <div className="flex gap-3 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="px-5 py-2.5 rounded-full text-sm md:text-base whitespace-nowrap transition-all"
                    style={{
                      backgroundColor: activeTab === tab.id ? 'var(--coffee-brown)' : 'var(--cream-beige)',
                      color: activeTab === tab.id ? 'white' : 'var(--coffee-brown)',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-3xl shadow-xl p-5">
                <p className="text-sm text-gray-600">Hero Slides</p>
                <p className="heading-font text-3xl" style={{ color: 'var(--coffee-brown)' }}>{heroSlides.length}</p>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-5">
                <p className="text-sm text-gray-600">Gallery Images</p>
                <p className="heading-font text-3xl" style={{ color: 'var(--coffee-brown)' }}>{galleryImages.length}</p>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-5">
                <p className="text-sm text-gray-600">Menu Items</p>
                <p className="heading-font text-3xl" style={{ color: 'var(--coffee-brown)' }}>{menuItems.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-4 md:p-5 mb-6 flex items-center justify-between gap-4">
              <p className="text-sm md:text-base text-gray-600">{status}</p>
              <button onClick={handleLogout} className="px-4 py-2 rounded-full text-white shrink-0" style={{ backgroundColor: 'var(--dark-green)' }}>
                Logout
              </button>
            </div>

            {activeTab === 'hero' && (
              <section className="bg-white rounded-3xl shadow-xl p-6 md:p-7 mb-6">
                <h3 className="heading-font text-2xl mb-3" style={{ color: 'var(--coffee-brown)' }}>Hero Slides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input className="border rounded-xl px-4 py-3" placeholder="Title" value={heroForm.title} onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })} />
                </div>
                <input className="border rounded-xl px-4 py-3 w-full mb-3" type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} />
                <p className="text-xs text-gray-500 mb-3">{heroFile ? `Selected: ${heroFile.name}` : 'Pick one image and the admin will upload it directly when you add the slide.'}</p>
                <button disabled={isBusy} onClick={createHeroSlide} className="px-5 py-2.5 rounded-full text-white" style={{ backgroundColor: 'var(--coffee-brown)' }}>Upload & Add Hero Slide</button>
                <div className="space-y-2 mt-5">
                  {heroSlides.map((item) => (
                    <div key={item._id} className="border rounded-xl p-3 flex items-center justify-between gap-3">
                      <p className="text-sm truncate">{item.title || item.imageUrl}</p>
                      <button onClick={() => deleteItem('hero', item._id)} className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#b42318' }}>Delete</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'gallery' && (
              <section className="bg-white rounded-3xl shadow-xl p-6 md:p-7 mb-6">
                <h3 className="heading-font text-2xl mb-3" style={{ color: 'var(--coffee-brown)' }}>Gallery (Follow Our Journey)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input className="border rounded-xl px-4 py-3" placeholder="Caption" value={galleryForm.caption} onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })} />
                </div>
                <input className="border rounded-xl px-4 py-3 w-full mb-3" type="file" accept="image/*" onChange={(e) => setGalleryFile(e.target.files?.[0] || null)} />
                <p className="text-xs text-gray-500 mb-3">{galleryFile ? `Selected: ${galleryFile.name}` : 'Pick one image and save it directly to gallery.'}</p>
                <button disabled={isBusy} onClick={createGalleryImage} className="px-5 py-2.5 rounded-full text-white" style={{ backgroundColor: 'var(--coffee-brown)' }}>Upload & Add Gallery Image</button>
                <div className="space-y-2 mt-5">
                  {galleryImages.map((item) => (
                    <div key={item._id} className="border rounded-xl p-3 flex items-center justify-between gap-3">
                      <p className="text-sm truncate">{item.caption || item.imageUrl}</p>
                      <button onClick={() => deleteItem('gallery', item._id)} className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#b42318' }}>Delete</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'menu' && (
              <section className="bg-white rounded-3xl shadow-xl p-6 md:p-7 mb-6">
                <h3 className="heading-font text-2xl mb-3" style={{ color: 'var(--coffee-brown)' }}>Menu Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input className="border rounded-xl px-4 py-3" placeholder="Name" value={menuForm.name} onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })} />
                  <select className="border rounded-xl px-4 py-3" value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })} style={{ color: menuForm.category ? 'var(--coffee-brown)' : '#999' }}>
                    <option value="" disabled>Select Category</option>
                    {MENU_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input className="border rounded-xl px-4 py-3" type="number" placeholder="Price" value={menuForm.price} onChange={(e) => setMenuForm({ ...menuForm, price: Number(e.target.value) })} />
                </div>
                <input className="border rounded-xl px-4 py-3 w-full mb-3" placeholder="Description" value={menuForm.description} onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })} />
                <input className="border rounded-xl px-4 py-3 w-full mb-3" type="file" accept="image/*" onChange={(e) => setMenuFile(e.target.files?.[0] || null)} />
                <p className="text-xs text-gray-500 mb-3">{menuFile ? `Selected: ${menuFile.name}` : 'Pick one menu image and save it directly with the item.'}</p>
                <button disabled={isBusy} onClick={createMenuItem} className="px-5 py-2.5 rounded-full text-white" style={{ backgroundColor: 'var(--coffee-brown)' }}>Upload & Add Menu Item</button>
                <div className="space-y-2 mt-5">
                  {menuItems.map((item) => (
                    <div key={item._id} className="border rounded-xl p-3 flex items-center justify-between gap-3">
                      <p className="text-sm truncate">{item.name} - ₹{item.price}</p>
                      <button onClick={() => deleteItem('menu', item._id)} className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#b42318' }}>Delete</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'reviews' && (
              <section className="bg-white rounded-3xl shadow-xl p-6 md:p-7 mb-6">
                <h3 className="heading-font text-2xl mb-3" style={{ color: 'var(--coffee-brown)' }}>Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input className="border rounded-xl px-4 py-3" placeholder="Name" value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} />
                  <input className="border rounded-xl px-4 py-3" placeholder="Role" value={reviewForm.role} onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })} />
                  <input className="border rounded-xl px-4 py-3" type="number" min={1} max={5} placeholder="Rating" value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })} />
                </div>
                <textarea className="border rounded-xl px-4 py-3 w-full mb-3" placeholder="Message" value={reviewForm.message} onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })} />
                <input className="border rounded-xl px-4 py-3 w-full mb-3" type="file" accept="image/*" onChange={(e) => setReviewFile(e.target.files?.[0] || null)} />
                <p className="text-xs text-gray-500 mb-3">{reviewFile ? `Selected: ${reviewFile.name}` : 'Pick one avatar image and save it directly with the review.'}</p>
                <button disabled={isBusy} onClick={createReview} className="px-5 py-2.5 rounded-full text-white" style={{ backgroundColor: 'var(--coffee-brown)' }}>Upload & Add Review</button>
                <div className="space-y-2 mt-5">
                  {reviews.map((item) => (
                    <div key={item._id} className="border rounded-xl p-3 flex items-center justify-between gap-3">
                      <p className="text-sm truncate">{item.name} ({item.rating}/5)</p>
                      <button onClick={() => deleteItem('reviews', item._id)} className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#b42318' }}>Delete</button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
