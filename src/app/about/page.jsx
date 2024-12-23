import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../utils/content.js';
import Image from '../../components/Image.jsx';
import Heading from '../../components/Heading.jsx';

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug('/about');

    if (!page) {
      return notFound();
    }

    const heading = page.sections.find((section) => section.type === 'pageHeading');
    const subtitle = page.sections.find((section) => section.type === 'textField');
    const photo = page.sections.find((section) => section.type === 'image');

    return (
      <div data-sb-object-id={page.id} className='container mx-auto flex justify-between'>
        <div className='mr-10 max-w-lg'>
          <h1 className='pb-10'><Heading pageHeadingText={heading.pageHeadingText} /></h1>
          <h2 className='font-heading'>{subtitle.textFieldBody}</h2>
        </div>
        <Image {...photo} />
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
