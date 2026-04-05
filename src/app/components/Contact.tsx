export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32" style={{ backgroundColor: 'var(--cream-beige)' }}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="heading-font text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: 'var(--coffee-brown)' }}
          >
            Visit Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to see you at our cafe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl h-full">
            <h3
              className="heading-font text-3xl md:text-4xl mb-8"
              style={{ color: 'var(--coffee-brown)' }}
            >
              Get In Touch
            </h3>

            {/* Address */}
            <div className="mb-8 flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--cream-beige)' }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="var(--coffee-brown)"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg mb-2" style={{ color: 'var(--coffee-brown)' }}>
                  Address
                </h4>
                <p className="text-gray-700">
                  B4, Swami Darshan, Mohan Jyot,<br />
                  Near Shiv Mandir Road, Kher,<br />
                  Ambernath, Maharashtra 421501
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="mb-8 flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--cream-beige)' }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="var(--coffee-brown)"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg mb-2" style={{ color: 'var(--coffee-brown)' }}>
                  Opening Hours
                </h4>
                <p className="text-gray-700">
                  Monday - Sunday<br />
                  11:00 AM - 10:30 PM
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-8 flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--cream-beige)' }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="var(--coffee-brown)"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg mb-2" style={{ color: 'var(--coffee-brown)' }}>
                  Phone
                </h4>
                <p className="text-gray-700">7447557072</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                className="flex-1 px-6 py-3 rounded-full text-white transition-all hover:scale-105 shadow-md"
                style={{ backgroundColor: 'var(--coffee-brown)' }}
                onClick={() => window.open('https://maps.google.com', '_blank')}
              >
                Get Directions
              </button>
              <button
                className="flex-1 px-6 py-3 rounded-full text-white transition-all hover:scale-105 shadow-md"
                style={{ backgroundColor: 'var(--dark-green)' }}
                onClick={() => window.open('tel:+917447557072', '_self')}
              >
                Call Now
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl min-h-[500px] lg:min-h-0 lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.7985836438625!2d73.1816968!3d19.2039977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795f7f43c70fd%3A0xc3becbb0145b892a!2sBonjour%20Brew%20Cafe!5e0!3m2!1sen!2sin!4v1775365707720!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bonjour Brew Cafe Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
