import Markdown from 'markdown-to-jsx';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'md:flex-row-reverse',
  imgRight: 'md:flex-row',
};

export const Hero = (props) => {
  return (
    <div className="px-6 py-16 bg-gray-100 sm:px-12 sm:py-24" data-sb-object-id={props.id}>
      <div
        className={`max-w-full mx-auto flex flex-col gap-12 md:items-center ${
          themeClassMap[props.theme] ?? themeClassMap['imgRight']
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex-1">
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
      </div>
    </div>
  );
};
