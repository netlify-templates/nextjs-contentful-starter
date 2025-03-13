import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../utils/content.js';
import Heading from '../../components/Heading.jsx';
import Markdown from 'markdown-to-jsx';

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug('/faq');

    if (!page) {
      return notFound();
    }

    const questions = page.sections.find((section) => section.type === 'faqQuestions');

    return (
      <div data-sb-object-id={page.id} className='container mx-auto mb-10 p-5 flex flex-col justify-between lg:flex-row'>
        <div className='mb-10 lg:mr-10 lg:mb-0'>
          <h1 className='pb-6 lg:pb-10'><Heading pageHeadingText='FAQ' /></h1>
          <Markdown options={{
            overrides: {
              h3: ({ children }) => <h3 className='mb-5 font-heading text-lg font-semibold'>{children}</h3>,
              p: ({ children }) => <p className='mb-5'>{children}</p>,
            },
          }}>
            {questions.faqContent}
          </Markdown>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
