import Markdown from 'markdown-to-jsx';

export default function TextField(props) {
  return (
    <Markdown className={props.className}>{props.textFieldBody}</Markdown>
  );
}
