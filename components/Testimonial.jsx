import Link from 'next/link';

{/* <div data-sb-field-path="subquote">{JSON.stringify(props.subquote)}</div> */}
export const Testimonial = (props) => {
console.log("PROPS", props)
  return (
    <div data-sb-object-id={`${props.id}`}>
        <div data-sb-field-path="quote">{props.quote}</div>
       
    </div>
  );
};
