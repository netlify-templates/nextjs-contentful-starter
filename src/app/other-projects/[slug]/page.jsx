import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../../utils/content.js';
import Heading from '../../../components/Heading.jsx';
import Image from '../../../components/Image.jsx';
import Markdown from 'markdown-to-jsx';

const tableMap = {
  completionDate: 'Completion Date',
  materials: 'Materials',
  dimensions: 'Dimensions',
  extraFields: 'Additional Specs',
};

const parseTableValue = (content) => {
  if (Array.isArray(content)) {
    return content.join('<br />');
  }
  return content;
}

export default async function ProjectShowPage({ params }) {
  const { slug } = await params;

  try {
    const page = await getPageFromSlug(`/other-projects/${slug}`);

    if (!page) {
      return notFound();
    }

    const { sections } = page;

    const imageData = sections.find((section) => section.type === 'imageGroup');
    const [firstImage, ...remainingImages] = imageData.images;
    const unfilteredProjectData = sections.find((section) => section.type === 'projectInfoTable');
    const { id, type, ...projectData } = unfilteredProjectData;

    const jsonLd = {
      '@context': 'https://loschguitars.com',
      '@type': 'Product',
      name: imageData.name,
      image: firstImage,
      description: `Losch Guitars - ${imageData.name}`,
    };

    return (
      <div data-sb-object-id={page.id} className='container mx-auto p-5'>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className='mb-10'>
          <Heading className='font-shout text-4xl' pageHeadingText={imageData.name} />
        </h1>
        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start mb-10'>
          <div className='mb-10 lg:max-w-fit lg:mr-10'>
            {Object.keys(projectData).map((title) => {
              return (
                <div key={title} className='grid grid-cols-2 border-b border-lightGray py-4'>
                  <div className='font-bold mr-6'>{tableMap[title]}</div>
                  <div className='max-w-80'><Markdown>{parseTableValue(projectData[title])}</Markdown></div>
                </div>
              )
            })}
          </div>
          <Image {...firstImage} />
        </div>
        <div className='container flex flex-col lg:flex-wrap lg:flex-row justify-between items-center'>
          {remainingImages.map((image, idx) => (
            <Image
              {...image}
              className='mb-10'
              key={idx}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error!: ', error.message);
    return notFound();
  }
}
