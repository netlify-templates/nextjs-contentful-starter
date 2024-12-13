'use client';

import Image from 'next/image';

const ContentWithImage = ({ image, title, simpleContent, imageOnLeft }) => {
  return (
    <div className="py-8">
      <div className="mx-auto w-full">
        <div className="flex flex-col md:flex-row w-full items-center">
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
                <h2 className="text-4xl text-left mb-8 text-gray-100">{title}</h2>
                <p className="text-lg font-light text-gray-300">{simpleContent}</p>
              </div>
            </>
          ) : (
            <>
              <div className="md:w-1/2 p-4">
                <h2 className="text-4xl text-left mb-8 text-gray-100">{title}</h2>
                <p className="text-lg font-light text-gray-300">{simpleContent}</p>
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
