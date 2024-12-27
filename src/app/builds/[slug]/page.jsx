import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../../utils/content.js';
import Heading from '../../../components/Heading.jsx';
import Image from '../../../components/Image.jsx';
import Markdown from 'markdown-to-jsx';

const tableMap = {
  completionDate: 'Completion Date',
  bodyWood: 'Body Wood',
  topWood: 'Top Wood',
  backWood: 'Back Wood',
  neckWood: 'Neck Wood',
  fretboard: 'Fretboard',
  scaleLength: 'Scale Length',
  tuners: 'Tuners',
  nut: 'Nut',
  electronics: 'Electronics',
  pickups: 'Pickups',
  bridge: 'Bridge/Tailpiece',
  finish: 'Finish',
  knobs: 'Knobs',
  additionalSpecs: 'Additional Specs',
};

const parseTableValue = (content) => {
  if (Array.isArray(content)) {
    return content.join('<br />');
  }
  return content;
}

export default async function BuildsShowPage({ params }) {
  const { slug } = await params;

  try {
    const page = await getPageFromSlug(`/builds/${slug}`);

    if (!page) {
      return notFound();
    }

    const { sections } = page;

    const imageData = sections.find((section) => section.type === 'imageGroup');
    const [firstImage, ...remainingImages] = imageData.images;
    const unfilteredBuildData = sections.find((section) => section.type === 'guitarInfoTable');
    const { id, type, guitarName, ...buildData } = unfilteredBuildData;
    const [buildNumber, buildName] = guitarName.split(' - ');

    return (
      <div data-sb-object-id={page.id} className='container mx-auto p-5'>
        <h1 className='mb-2'>
          <Heading className='font-shout text-6xl' pageHeadingText={buildNumber} />
        </h1>
        <div className='border-b border-pale-blue border-2 w-8 mb-2' />
        <h2 className='mb-10'>
          <Heading pageHeadingText={buildName} />
        </h2>
        <div className='flex flex-col justify-between mb-10 lg:flex-row items-center lg:items-start'>
          <div className='max-w-lg lg:max-w-fit mb-10 lg:mr-10'>
            {Object.keys(buildData).map((title) => {
              return (
                <div key={title} className='grid grid-cols-2 border-b border-lightGray py-4'>
                  <div className='font-bold'>{tableMap[title]}</div>
                  <div className='max-w-80'><Markdown>{parseTableValue(buildData[title])}</Markdown></div>
                </div>
              )
            })}
          </div>
          <Image {...firstImage} className='h-full' />
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
