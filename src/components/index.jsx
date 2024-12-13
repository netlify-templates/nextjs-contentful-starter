import { Hero } from './Hero.jsx';
import NavLinks from './NavLinks.jsx';
import Playground from './Playground.jsx';
import ContentWithImage from './ContentWithImage.jsx';
import Carousel from './Carousel.jsx';
import Footer from './Footer.jsx';

// add new components here.
// the key should match the name of the component in contentful
// the value should be the component
const componentMap = {
  hero: Hero,
  navigation: NavLinks,
  playground: Playground,
  contentWithImage: ContentWithImage,
  carousel: Carousel,
  footer: Footer,
};

const FallbackComponent = (props) => {
  return <p>{JSON.stringify(props, null, 4)}</p>;
};

export const getComponentForSection = (section) => {
  return componentMap[section.type] || FallbackComponent;
};
