import Link from 'next/link';

const themeClassMap = {
  default: 'border-purple-700 bg-purple-700 text-white hover:bg-purple-500 hover:border-purple-500',
  outline: 'border-purple-700 bg-transparent text-purple-700 hover:text-purple-500 hover:border-purple-500',
};

export const Button = (props) => {
  return (
    <Link
      href={props.url}
      className={`py-3 px-6 inline-block border-2 font-semibold rounded-md transition-all duration-300 ${
        themeClassMap[props.theme] ?? themeClassMap['default']
      }`}
      data-sb-object-id={props.id}
    >
      <span data-sb-field-path="label">{props.label}</span>
    </Link>
  );
};
