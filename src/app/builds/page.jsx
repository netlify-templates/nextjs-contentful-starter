import { notFound } from 'next/navigation';
import { Hero } from '../../components/Hero.jsx';
import { getPageFromSlug } from '../../utils/content.js';

const componentMap = {
  hero: Hero,
};

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug('/builds');

    if (!page) {
      return notFound();
    }

    return (
      <div data-sb-object-id={page.id}>
        Builds index page
        {(page.sections || []).map((section, idx) => {
          const Component = componentMap[section.type];
          return <Component key={idx} {...section} />;
        })}
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
