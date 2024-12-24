import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../utils/content.js';
import Image from '../../components/Image.jsx'

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug('/builds');

    if (!page) {
      return notFound();
    }

    const { sections } = page;

    return (
      <div data-sb-object-id={page.id} className='container mx-auto'>
        <div className='container flex flex-wrap justify-around items-center'>
          {sections.map((section, idx) => (
            <Image
              {...section}
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
