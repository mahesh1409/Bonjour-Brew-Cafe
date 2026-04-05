import logoImage from '../../imports/bonjourbrewcafe.png';

export function About() {
  return (
    <section id="about" className="py-20 md:py-32" style={{ backgroundColor: 'var(--cream-beige)' }}>
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src={logoImage}
                  alt="Bonjour Brew Cafe Logo"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2
                  className="heading-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6"
                  style={{ color: 'var(--coffee-brown)' }}
                >
                  Our Story
                </h2>
                <p
                  className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-relaxed"
                  style={{ color: 'var(--dark-green)' }}
                >
                  Serving handcrafted coffee and warm experiences in Ambernath
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  At Bonjour Brew Cafe, we believe that coffee is more than just a beverage—it's an experience, a moment of comfort, and a reason to connect. Nestled in the heart of Ambernath, our cafe brings together the finest beans, artisanal recipes, and a cozy ambiance that feels like home.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-700 mt-4">
                  Whether you're here for a quick caffeine fix, a delicious treat, or simply to unwind with friends, we promise you a vibe you'll want to revisit. Welcome to our community!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
