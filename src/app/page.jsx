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
    const [logo, ...otherImages] = images;
    const testimonials = otherSections.filter((section) => section.type === 'testimonial');
console.log('*** sections: ', sections)

    return (
      <div data-sb-object-id={page.id} className=''>
        <div className='bg-black py-10 mb-10'>
          <div className='mx-auto max-w-md'>
            <Image {...logo} className='bg-black inline-block' />
            <TextField {...heroSubtitle} className='font-heading text-cream inline-block' />
          </div>
        </div>

        <div className='container flex justify-around mx-auto mb-10'>
          {otherImages.map((image) => (
            <Image
              key={image.id}
              {...image}
              width={300}
              height={300}
              className='mr-10'
            />
          ))}
        </div>

        <div className='container mx-auto mb-10'>
          <Carousel slides={testimonials} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
