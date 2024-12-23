import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../utils/content.js';

export default async function ComposablePage({ params }) {
  const { slug } = await params;
  try {
    const pageSlug = slug.join('/');
    const page = await getPageFromSlug(`/${pageSlug}`);

    if (!page) {
      return notFound();
    }

    return (
      <div data-sb-object-id={page.id}>
        Builds/show page
        {/* {(page.sections || []).map((section, idx) => {
          const Component = componentMap[section.type];
          return <Component key={idx} {...section} />;
        })} */}
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
