import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../utils/content.js';
import Image from '../../components/Image.jsx';
import Heading from '../../components/Heading.jsx';
import Markdown from 'markdown-to-jsx';

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
      <div data-sb-object-id={page.id} className='container p-5 mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <div className='mb-10 max-w-lg lg:mr-10 lg:mb-0'>
          <h1 className='pb-6 lg:pb-10'><Heading pageHeadingText={heading.pageHeadingText} /></h1>
          <Markdown>{subtitle.textFieldBody}</Markdown>
        </div>
        <Image {...photo} />
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
