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
    console.log('*** sections: ', sections)
    const imageData = sections.find((section) => section.type === 'imageGroup');
    const [firstImage, ...remainingImages] = imageData.images;
    const unfilteredProjectData = sections.find((section) => section.type === 'projectInfoTable');
    const { id, type, ...projectData } = unfilteredProjectData;
    
    return (
      <div data-sb-object-id={page.id} className='container mx-auto'>
        <h1 className='mb-10'><Heading className='font-shout text-4xl' pageHeadingText={imageData.name} /></h1>
        <div className='flex justify-between mb-10'>
          <div className='max-w-lg mb-10'>
            {Object.keys(projectData).map((title) => {
              return (
                <div className='grid grid-cols-2 border-b border-lightGray py-4'>
                  <div className='font-bold'>{tableMap[title]}</div>
                  <div><Markdown>{parseTableValue(projectData[title])}</Markdown></div>
                </div>
              )
            })}
          </div>
          <Image {...firstImage} />
        </div>
        <div className='container flex flex-wrap justify-between items-center'>
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
