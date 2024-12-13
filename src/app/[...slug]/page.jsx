import { notFound } from 'next/navigation';
import { Hero } from '../../components/Hero.jsx';
import { getPageFromSlug } from '../../utils/content.js';
import NavLinks from '../../components/NavLinks.jsx';
import Playground from '../../components/Playground.jsx';
import ContentWithImage from '../../components/ContentWithImage.jsx';
import Carousel from '../../components/Carousel.jsx';
import Footer from '../../components/Footer.jsx';
import { Fallback } from '../../components/Fallback.jsx';
import ProductBreakdown from '../../components/ProductBreakdown.jsx';
import ContentWithEmbed from '../../components/ContentWithEmbed.jsx';

const componentMap = {
  hero: Hero,
  navigation: NavLinks,
  playground: Playground,
  contentWithImage: ContentWithImage,
  carousel: Carousel,
  footer: Footer,  
  productBreakdown: ProductBreakdown,
  contentWithEmbed: ContentWithEmbed
};

export default async function ComposablePage({ params }) {
  const { slug } = params;

  const pageSlug = slug.join('/');

  try {
    const page = await getPageFromSlug(`/${pageSlug}`);

    if (!page) {
      return notFound();
    }

    return (
      <div data-sb-object-id={page.id}>
        {(page.sections || []).map((section, idx) => {
          const Component = componentMap[section.type] || Fallback;
          return <Component key={idx} {...section} />;
        })}
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
