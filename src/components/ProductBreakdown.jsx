import Markdown from 'markdown-to-jsx';
import ContentWithImage from './ContentWithImage.jsx';
import ContentWithEmbed from '../components/ContentWithEmbed.jsx';

const ProductBreakdown = ({ sectionTitle, sectionSubtext, element }) => {
  console.log(element);
  return (
    <div className="w-full bg-gray-950 text-gray-100 mx-auto flex-1 py-16 px-20 rounded-lg mt-12 shadow-lg shadow-gray-800">
      {/* Title */}
      <h1 className="mb-6 text-4xl sm:text-5xl" data-sb-field-path="heading">{sectionTitle}</h1>
      
      {/* Subtitle */}
      {sectionSubtext && (
        <h2 className="mb-6 text-lg" data-sb-field-path="body">{sectionSubtext}</h2>
      )}

      {/* Content with Image or Embed */}
      {element && element.map((item) => {
        if (item.type === 'contentWithImage') {
          return <ContentWithImage key={item.id} {...item} />;
        } else if (item.type === 'contentWithEmbed') {
          return <ContentWithEmbed key={item.id} {...item} />;
        } else {
          console.log('No image or embed');
          return null;
        }
      })}
    </div>
  );
};

export default ProductBreakdown;

