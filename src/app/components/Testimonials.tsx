import { useEffect, useState } from 'react';
import { fetchReviews } from '../../lib/contentApi';
import { fallbackReviews, type ReviewContent } from '../../lib/content';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

function toTestimonial(review: ReviewContent): Testimonial {
  return {
    id: review._id || review.name,
    name: review.name,
    role: review.role || 'Customer',
    avatar: review.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    quote: review.message,
    rating: review.rating,
  };
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackReviews.map(toTestimonial));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetchReviews()
      .then((reviews) => {
        if (isMounted && reviews.length > 0) {
          setTestimonials(reviews.map(toTestimonial));
          setCurrentIndex(0);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTestimonials(fallbackReviews.map(toTestimonial));
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="heading-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: 'var(--coffee-brown)' }}
          >
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <div
              className="rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl transition-all duration-500"
              style={{ backgroundColor: 'var(--cream-beige)' }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover mb-5 sm:mb-6 border-4 border-white shadow-lg"
                />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="var(--terracotta)"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg md:text-2xl mb-5 sm:mb-6 leading-relaxed text-gray-800">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Name & Role */}
                <div>
                  <h4
                    className="heading-font text-lg sm:text-xl md:text-2xl mb-1"
                    style={{ color: 'var(--coffee-brown)' }}
                  >
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8' : ''
                  }`}
                  style={{
                    backgroundColor:
                      index === currentIndex ? 'var(--coffee-brown)' : '#D1D5DB',
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
