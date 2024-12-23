export default function Heading(props) {
  return (
    <div className={`font-heading text-2xl ${props.className}`}>
      {props.pageHeadingText}
    </div>
  );
}
