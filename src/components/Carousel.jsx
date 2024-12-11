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
    <div className="relative w-full max-w-4xl mx-auto pt-4 pb-4">
      <h2 className="text-center">{title}</h2>
      <p className="text-center mb-4">{description}</p>

      <div className="relative">
        {/* Arrow Buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          <button onClick={handlePrev} className="bg-gray-800 text-white p-2 rounded-full shadow-lg">
            &#10094;
          </button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <button onClick={handleNext} className="bg-gray-800 text-white p-2 rounded-full shadow-lg">
            &#10095;
          </button>
        </div>

        <div className="overflow-hidden rounded-lg mb-8">
          <div
            className="flex transition-all duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0 flex justify-center items-center w-full">
                {item.src.src.startsWith('https://videos') && (
                  <video className="w-10/12 h-96 object-cover rounded" controls src={item.src.src} alt={item.title} />
                )}
                {item.type === 'image' && (
                  <Image
                    className="w-10/12 h-96 object-cover"
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
