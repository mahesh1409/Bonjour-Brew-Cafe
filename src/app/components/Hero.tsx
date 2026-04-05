import { useEffect, useState } from 'react';
import { fetchHeroSlides } from '../../lib/contentApi';
import { fallbackHeroSlides } from '../../lib/content';

const fallbackHeroImages = fallbackHeroSlides.map((slide) => slide.imageUrl);

export function Hero() {
  const [heroImages, setHeroImages] = useState<string[]>(fallbackHeroImages);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetchHeroSlides()
      .then((slides) => {
        const remoteImages = slides.map((slide) => slide.imageUrl).filter(Boolean);
        if (isMounted && remoteImages.length > 0) {
          setHeroImages(remoteImages);
          setCurrentImageIndex(0);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHeroImages(fallbackHeroImages);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Bonjour Brew Cafe ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-[100svh] flex items-center justify-center text-center px-4 sm:px-6 pt-24 pb-20">
        <div className="max-w-4xl animate-fadeIn">
          <h1
            className="heading-font text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-white"
          >
            A vibe you'll want to revisit
          </h1>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/90 mb-8 max-w-2xl mx-auto">
            Coffee • Cookies • Community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto">
            <button
              onClick={() => scrollToSection('menu')}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-white transition-all hover:scale-105 shadow-lg text-lg"
              style={{ backgroundColor: 'var(--coffee-brown)' }}
            >
              Explore Menu
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg"
              style={{
                backgroundColor: 'var(--cream-beige)',
                color: 'var(--coffee-brown)',
              }}
            >
              Visit Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
