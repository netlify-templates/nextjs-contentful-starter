import Image from 'next/image.js';
import Link from 'next/link';

export default function ContentfulImage(props) {
  const hoverClasses = props.imageLink ? 'hover:opacity-60 transition-opacity' : '';
  const baseImage = (
    <Image
      src={props.imageContent?.src || props.src}
      className={`border-8 border-black ${hoverClasses} ${props.className}`}
      width={props.width || 476}
      height={props.height || 476}
      sizes={props.sizes}
      alt={props.imageContent?.alt || props.alt}
    />
  );

  if (props.imageLink) {
    return (
      <Link href={props.imageLink}>
        {baseImage}
        <div className='py-4 font-heading text-center'>{props.imageContent.alt}</div>
      </Link>
    );
  }
  return baseImage;
}
