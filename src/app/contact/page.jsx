import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../utils/content.js';
import Heading from '../../components/Heading.jsx';
import sendEmail from '../../utils/sendgrid.js';
import ContactForm from '../../components/ContactForm.jsx';

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug('/contact');

    if (!page) {
      return notFound();
    }

    const handleSubmit = async (formData) => {
      'use server'
      await sendEmail(formData);
    }

    const heading = page.sections.find((section) => section.type === 'pageHeading');
    const subtitle = page.sections.find((section) => section.type === 'textField');

    return (
      <div data-sb-object-id={page.id} className='container mx-auto flex justify-between'>
        <div className='mr-10'>
          <h1 className='pb-10'><Heading pageHeadingText={heading.pageHeadingText} /></h1>
          <h2 className='font-heading'>{subtitle.textFieldBody}</h2>
        </div>

        <ContactForm sendEmail={handleSubmit} />
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
