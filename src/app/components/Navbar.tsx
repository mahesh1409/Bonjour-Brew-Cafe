import { useState, useEffect } from 'react';
import logoImage from '../../imports/bonjourbrewcafe.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <img
              src={logoImage}
              alt="Bonjour Brew Cafe Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain mr-2 sm:mr-3"
            />
            <span
              className="heading-font text-lg sm:text-xl md:text-3xl cursor-pointer whitespace-nowrap truncate max-w-[55vw] sm:max-w-none"
              style={{ color: 'var(--coffee-brown)' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Bonjour Brew Cafe
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('menu')}
              className="hover:opacity-70 transition-opacity"
              style={{ color: 'var(--dark-green)' }}
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:opacity-70 transition-opacity"
              style={{ color: 'var(--dark-green)' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('instagram')}
              className="hover:opacity-70 transition-opacity"
              style={{ color: 'var(--dark-green)' }}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:opacity-70 transition-opacity"
              style={{ color: 'var(--dark-green)' }}
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 rounded-full text-white transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--coffee-brown)' }}
            >
              Visit Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
                style={{ backgroundColor: 'var(--coffee-brown)' }}
              ></span>
              <span
                className={`block h-0.5 w-full transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
                style={{ backgroundColor: 'var(--coffee-brown)' }}
              ></span>
              <span
                className={`block h-0.5 w-full transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
                style={{ backgroundColor: 'var(--coffee-brown)' }}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left hover:opacity-70 transition-opacity"
                style={{ color: 'var(--dark-green)' }}
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left hover:opacity-70 transition-opacity"
                style={{ color: 'var(--dark-green)' }}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('instagram')}
                className="text-left hover:opacity-70 transition-opacity"
                style={{ color: 'var(--dark-green)' }}
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left hover:opacity-70 transition-opacity"
                style={{ color: 'var(--dark-green)' }}
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 rounded-full text-white transition-all text-center"
                style={{ backgroundColor: 'var(--coffee-brown)' }}
              >
                Visit Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
