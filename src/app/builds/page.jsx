import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../utils/content.js';
import Image from '../../components/Image.jsx'
import Heading from '../../components/Heading.jsx';

export const metadata = {
  title: 'Guitars',
};

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug('/builds');

    if (!page) {
      return notFound();
    }

    const { sections } = page;
    const [heading, ...images] = sections;

    return (
      <div data-sb-object-id={page.id} className='container mx-auto p-5'>
        <Heading {...heading} className='mb-5' />
        <div className='container flex flex-wrap justify-around items-center'>
          {images.map((section, idx) => (
            <Image
              {...section}
              className='mt-4 lg:mb-0'
              key={idx}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
