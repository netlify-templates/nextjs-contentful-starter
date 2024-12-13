import Markdown from 'markdown-to-jsx';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'md:flex-row-reverse',
  imgRight: 'md:flex-row',
};

export const Hero = (props) => {
  return (
    <div className="px-6 py-12 sm:px-12 sm:py-12" data-sb-object-id={props.id}>
      <div
        className={`max-w-full mx-auto flex flex-col gap-12 md:items-center ${
          themeClassMap[props.theme] ?? themeClassMap['imgRight']
        }`}
      >
        <div className="w-full max-w-3xl mx-auto flex-1 text-center">
          <h1 className="mb-6 text-4xl text-gray-950 sm:text-5xl" data-sb-field-path="heading">
            {props.heading}
          </h1>
          {props.body && (
            <Markdown options={{ forceBlock: true }} className="mb-6 text-lg text-gray-950" data-sb-field-path="body">
              {props.body}
            </Markdown>
          )}
          <div className="flex justify-center space-x-4">
            {props.button && <Button {...props.button} />}
            {props.buttonRight && <Button {...props.buttonRight} />}
          </div>
        </div>
      </div>
    </div>
  );
};
