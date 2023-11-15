import Link from 'next/link';

{/* <div data-sb-field-path="subquote">{JSON.stringify(props.subquote)}</div> */}
export const Testimonial = (props) => {
  console.log("PROPS", props);
  return (
    <div data-sb-object-id={`${props.id}`} className="bg-blue-900 text-white  p-4 text-center">
      <div data-sb-field-path="quote" className="max-w-md mx-auto text-xl">
        <div className="relative">
          <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-3xl text-blue-900">&#8220;</div>
          <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-3xl text-blue-900">&#8221;</div>
        </div>
        {props.quote}
      </div>
    </div>
  );
};
