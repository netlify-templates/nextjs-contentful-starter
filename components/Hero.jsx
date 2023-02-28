import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'flex-row-reverse',
  imgRight: '',
};

export const Hero = (props) => {
  return (
    <div className="px-12 py-24 bg-gray-100" data-sb-object-id={props.id}>
      <div className={`flex mx-auto max-w-6xl gap-12 ${themeClassMap[props.theme] ?? themeClassMap['imgRight']}`}>
        <div className="max-w-xl py-20 mx-auto lg:shrink-0">
          <h1 className="mb-6 text-5xl font-bold" data-sb-field-path="heading">
            {props.heading}
          </h1>
          {props.body && (
            <Markdown options={{ forceBlock: true }} className="mb-4 text-lg" data-sb-field-path="body">
              {props.body}
            </Markdown>
          )}
          {props.button && <Button {...props.button} />}
        </div>
        <div className="relative hidden w-full overflow-hidden rounded-md lg:block">
          {props.image && (
            <Image
              src={props.image.src}
              alt={props.image.alt}
              layout="fill"
              objectFit="cover"
              data-sb-field-path="image"
            />
          )}
        </div>
      </div>
    </div>
  );
};
