import Link from 'next/link';

const themeClassMap = {
  default: 'border-black bg-black text-white hover:bg-gray-600 hover:border-gray-800',
  outline: 'border-black bg-transparent text-black hover:bg-black hover:text-white',
  black: 'border-black bg-black text-white hover:bg-gray-900 hover:border-gray-900',
};

export const Button = (props) => {
  return (
    <Link
      href={props.url}
      className={`py-3 px-6 inline-block border-2 rounded-full transition-all duration-300 ${
        themeClassMap[props.theme] ?? themeClassMap['default']
      }`}
      data-sb-object-id={props.id}
    >
      <span data-sb-field-path="label">{props.label}</span>
    </Link>
  );
};
