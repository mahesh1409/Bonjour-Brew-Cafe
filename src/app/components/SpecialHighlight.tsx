export function SpecialHighlight() {
  return (
    <section className="py-16 sm:py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, var(--coffee-brown) 0%, var(--terracotta) 100%)`,
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-96 sm:h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          {/* Content */}
          <div className="relative py-14 sm:py-16 md:py-24 px-5 sm:px-6 md:px-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block mb-5 sm:mb-6 px-5 sm:px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-white text-xs sm:text-sm md:text-base uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="heading-font text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-5 sm:mb-6 text-white">
                Everything under ₹350
              </h2>

              <p className="text-base sm:text-lg md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                Indulge in premium coffee, delicious treats, and cozy vibes without breaking the bank
              </p>

              <div className="max-w-xl mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
