import React, { useState, useEffect } from 'react';

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1920&auto=format&fit=crop", // Plumber
    alt: "Expert Plumbing Services"
  },
  {
    url: "https://images.unsplash.com/photo-1611244419377-b0a760c19719?q=80&w=1920&auto=format&fit=crop", // Carpenter
    alt: "Skilled Carpentry"
  },
  {
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1920&auto=format&fit=crop", // Painter
    alt: "Professional Painting"
  },
  {
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop", // Home Decorator
    alt: "Interior Decoration"
  },
  {
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920&auto=format&fit=crop", // Electrician
    alt: "Electrical Services"
  }
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Slower, more elegant transitions
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'
              }`}
          />
          {/* Refined overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-indigo-900/40" />
        </div>
      ))}
    </div>
  );
};