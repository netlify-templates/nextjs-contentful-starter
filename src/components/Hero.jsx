import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'md:flex-row-reverse',
  imgRight: 'md:flex-row',
};

export const Hero = (props) => {
  return (
    <div className="px-6 py-16 bg-gray-100 sm:px-12 sm:py-24" data-sb-object-id={props.id}>
      <div className={`max-w-6xl mx-auto flex flex-col gap-12 md:items-center ${themeClassMap[props.theme] ?? themeClassMap['imgRight']}`}>
        <div className="w-full max-w-xl mx-auto flex-1">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl" data-sb-field-path="heading">
            {props.heading}
          </h1>
          {props.body && (
            <Markdown options={{ forceBlock: true }} className="mb-6 text-lg" data-sb-field-path="body">
              {props.body}
            </Markdown>
          )}
          {props.button && <Button {...props.button} />}
        </div>
        <div className="w-full aspect-[4/3] flex-1 relative overflow-hidden rounded-md">
          {props.image && (
            <Image
              src={props.image.src}
              alt={props.image.alt}
              fill
              className='object-cover'
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 600px"
              data-sb-field-path="image"
            />
          )}
        </div>
      </div>
    </div>
  );
};
