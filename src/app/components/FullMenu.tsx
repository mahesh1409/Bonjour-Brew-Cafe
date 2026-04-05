import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { fetchMenuItems } from '../../lib/contentApi';
import { fallbackMenuItems, formatPrice, type MenuItemContent } from '../../lib/content';
import { ChevronDown } from 'lucide-react';

type MenuCategory = 
  | 'ALL'
  | 'CROISSANT'
  | 'BURGER'
  | 'FRIES'
  | 'SALAD'
  | 'PIZZA'
  | 'SPAGHETTI'
  | 'SOURDOUGH'
  | 'SANDWICH'
  | 'WRAP'
  | 'PASTA'
  | 'WINTER SPECIAL BOWL'
  | 'SOUP'
  | 'DESERT';

const CATEGORIES: MenuCategory[] = [
  'ALL',
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

export function FullMenu() {
  const [menuItems, setMenuItems] = useState<MenuItemContent[]>(fallbackMenuItems);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('ALL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const filteredItems = selectedCategory === 'ALL' 
    ? menuItems 
    : menuItems.filter((item) => item.category?.toUpperCase() === selectedCategory);

  const goBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen py-12 md:py-16" style={{ backgroundColor: 'var(--cream-beige)' }}>
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <h1 className="heading-font text-4xl sm:text-5xl md:text-6xl" style={{ color: 'var(--coffee-brown)' }}>
              Full Menu
            </h1>
            <p className="text-gray-700 mt-2">Explore all our cafe favorites.</p>
          </div>
          <button
            onClick={goBack}
            className="px-6 py-3 rounded-full text-white shadow-lg w-full sm:w-auto"
            style={{ backgroundColor: 'var(--coffee-brown)' }}
          >
            Back To Home
          </button>
        </div>

        {/* Category Selector - Dropdown for Mobile, Pills for Desktop */}
        <div className="mb-10 md:mb-12">
          {/* Mobile: Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-md border-2 transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: isDropdownOpen ? 'var(--coffee-brown)' : 'transparent',
                color: 'var(--coffee-brown)',
              }}
            >
              <span className="font-medium text-base">{selectedCategory === 'ALL' ? 'Select Category' : selectedCategory}</span>
              <ChevronDown
                size={20}
                style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl z-50 max-h-64 overflow-y-auto">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-5 py-3 border-b last:border-b-0 transition-all duration-200 hover:bg-gray-50"
                    style={{
                      backgroundColor: selectedCategory === category ? 'var(--cream-beige)' : 'transparent',
                      color: selectedCategory === category ? 'var(--coffee-brown)' : 'var(--coffee-brown)',
                      fontWeight: selectedCategory === category ? '600' : '500',
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: Horizontal Scrollable Pills */}
          <div className="hidden md:flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-3 rounded-full whitespace-nowrap font-medium text-sm transition-all duration-300 shadow-md"
                style={{
                  backgroundColor: selectedCategory === category ? 'var(--coffee-brown)' : 'white',
                  color: selectedCategory === category ? 'white' : 'var(--coffee-brown)',
                  border: selectedCategory === category ? 'none' : '2px solid var(--cream-beige)',
                  transform: selectedCategory === category ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedCategory === category ? '0 8px 16px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'var(--cream-beige)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.name}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 sm:h-60 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium text-white shadow-md"
                    style={{ backgroundColor: 'var(--terracotta)' }}
                  >
                    {item.category}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="heading-font text-xl sm:text-2xl flex-1" style={{ color: 'var(--coffee-brown)' }}>
                      {item.name}
                    </h3>
                    <span className="text-lg sm:text-xl font-bold" style={{ color: 'var(--terracotta)' }}>
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg" style={{ color: 'var(--coffee-brown)' }}>
              No items available in this category yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}