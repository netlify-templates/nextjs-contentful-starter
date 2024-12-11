'use client';
import { useState } from 'react';
import Image from 'next/image';

const Carousel = ({ title, description, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-all duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                {item.src.src.startsWith('https://videos') && (
                  <video className="w-full h-96 object-cover" controls src={item.src.src} alt={item.title} />
                )}
                {item.type === 'image' && (
                  <Image
                    className="w-full h-96 object-cover"
                    src={item.src}
                    alt={item.title}
                    height={300}
                    width={300}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
      >
        &#10095;
      </button>

      {/* Optional: Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
