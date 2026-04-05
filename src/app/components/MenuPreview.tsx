import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { fetchMenuItems } from '../../lib/contentApi';
import { fallbackMenuItems, formatPrice, type MenuItemContent } from '../../lib/content';

export function MenuPreview() {
  const [menuItems, setMenuItems] = useState<MenuItemContent[]>(fallbackMenuItems);

  useEffect(() => {
    let isMounted = true;

    fetchMenuItems()
      .then((items) => {
        if (isMounted && items.length > 0) {
          setMenuItems(items);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMenuItems(fallbackMenuItems);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openFullMenu = () => {
    window.history.pushState({}, '', '/menu');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="menu" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="heading-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: 'var(--coffee-brown)' }}
          >
            Our Menu
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Handcrafted with love, served with a smile
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {menuItems.map((item) => (
            <div
              key={item._id || item.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm text-white shadow-md"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-3 mb-2">
                  <h3
                    className="heading-font text-xl sm:text-2xl"
                    style={{ color: 'var(--coffee-brown)' }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-lg sm:text-xl"
                    style={{ color: 'var(--terracotta)' }}
                  >
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={openFullMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-white transition-all hover:scale-105 shadow-lg text-lg inline-flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--coffee-brown)' }}
          >
            View Full Menu
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
