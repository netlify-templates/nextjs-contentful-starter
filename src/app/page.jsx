import partition from 'lodash/partition';
import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../utils/content.js';
import Carousel from '../components/Carousel.jsx';
import Image from '../components/Image.jsx';
import TextField from '../components/TextField.jsx';

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug("/");

    if (!page) {
      return notFound();
    }

    const { sections } = page;
    const [images, otherSections] = partition(sections, (section) => section.type === 'image');
    const heroSubtitle = otherSections.find((section) => section.type === 'textField');
    const [heroLogo, ...otherImages] = images;
    const previewImages = otherImages.slice(0,3);
    const footerLogo = otherImages[3];
    const testimonials = otherSections.filter((section) => section.type === 'testimonial');
    const footerLogoComponent = <Image {...footerLogo} className='p-1 rounded-full' height={50} width={50} />;

    return (
      <div data-sb-object-id={page.id} className=''>
        <div className='bg-black p-10 mb-10'>
          <div className='mx-auto max-w-md'>
            <Image {...heroLogo} priority className='bg-black inline-block' />
            <TextField {...heroSubtitle} className='font-heading text-cream inline-block' />
          </div>
        </div>

        <div className='container flex flex-col lg:flex-row justify-center lg:justify-around content-center mx-auto mb-10'>
          {previewImages.map((image) => (
            <Image
              key={image.id}
              {...image}
              width={300}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className='mb-10 mx-auto lg:mb-0 lg:mx-unset'
            />
          ))}
        </div>

        <div className='container mx-auto mb-10'>
          <Carousel slides={testimonials} />
        </div>

        <div className='bg-black flex justify-center items-end py-10'>
          <div className='bg-red-orange rounded-full'>
            {footerLogoComponent}
          </div>
          <div className='bg-pale-blue rounded-full'>
            {footerLogoComponent}
          </div>
          <div className='bg-bright-yellow rounded-full'>
            {footerLogoComponent}
          </div>
          
        </div>
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
