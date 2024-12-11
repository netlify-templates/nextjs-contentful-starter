import Image from 'next/image';

const ContentWithImage = ({ image, title, simpleContent, imageOnLeft }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="flex w-full">
        {imageOnLeft ? (
          <>
            <div className="flex-1 pr-8">
              <Image src={image.src} alt={title} width={500} height={300} />
            </div>
            <div className="flex-1">
              <div className="text-lg">{simpleContent}</div>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1">
              <div className="text-lg">{simpleContent}</div>
            </div>
            <div className="flex-1 pr-8">
              <Image src={image.src} alt={title} width={500} height={300} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentWithImage;
