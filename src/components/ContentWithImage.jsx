'use client';

import Image from 'next/image';

const ContentWithImage = ({ image, title, simpleContent, imageOnLeft }) => {
  return (
    <div className="py-8 bg-gray-50 shadow-lg rounded-lg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">{title}</h2>
        <div className="flex flex-col md:flex-row items-center">
          {imageOnLeft ? (
            <>
              <div className="md:w-1/2 p-4">
                <Image
                  src={image.src}
                  alt={title}
                  width={500}
                  height={300}
                  objectFit="cover"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2 p-4">
                <p className="text-lg text-gray-700">{simpleContent}</p>
              </div>
            </>
          ) : (
            <>
              <div className="md:w-1/2 p-4">
                <p className="text-lg text-gray-700">{simpleContent}</p>
              </div>
              <div className="md:w-1/2 p-4">
                <Image
                  src={image.src}
                  alt={title}
                  width={500}
                  height={300}
                  objectFit="cover"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentWithImage;
