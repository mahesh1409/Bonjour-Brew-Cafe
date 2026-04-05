import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { fetchGalleryImages } from '../../lib/contentApi';
import { fallbackGalleryImages, type GalleryImageContent } from '../../lib/content';

export function Instagram() {
  const [galleryImages, setGalleryImages] = useState<GalleryImageContent[]>(fallbackGalleryImages);

  useEffect(() => {
    let isMounted = true;

    fetchGalleryImages()
      .then((images) => {
        if (isMounted && images.length > 0) {
          setGalleryImages(images);
        }
      })
      .catch(() => {
        if (isMounted) {
          setGalleryImages(fallbackGalleryImages);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="instagram" className="py-20 md:py-32" style={{ backgroundColor: 'var(--cream-beige)' }}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="heading-font text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: 'var(--coffee-brown)' }}
          >
            Follow Our Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Get a daily dose of cafe vibes on Instagram
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {galleryImages.map((post, index) => (
            <div
              key={post._id || `${post.imageUrl}-${index}`}
              className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <ImageWithFallback
                src={post.imageUrl}
                alt={post.caption || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <div className="mb-2">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base font-medium px-2">{post.caption || 'Bonjour Brew Cafe'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/bonjourbrew.cafe?igsh=MTh0NWFxZ3oybDFkYg=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white transition-all hover:scale-105 shadow-lg text-lg"
            style={{ backgroundColor: 'var(--coffee-brown)' }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
