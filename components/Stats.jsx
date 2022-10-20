import Markdown from 'markdown-to-jsx';

const themeClassMap = {
  primary: 'bg-purple-700 text-white',
  dark: 'bg-gray-800 text-white',
};

export const Stats = (props) => {
  return (
    <div className={`py-24 px-12 text-center ${themeClassMap[props.theme] ?? themeClassMap['primary']}`}>
      <div className="mx-auto">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">{props.heading}</h2>
          <Markdown options={{ forceBlock: true }} className="sm:text-lg">
            {props.body}
          </Markdown>
        </div>
        <div className="grid max-w-3xl gap-12 mx-auto sm:grid-cols-3">
          {props.stats.length > 0 && props.stats.map((stat, idx) => <StatItem key={idx} {...stat} />)}
        </div>
      </div>
    </div>
  );
};

const StatItem = (props) => {
  return (
    <div>
      <div className="mb-3 text-4xl font-bold sm:text-5xl">{props.value}</div>
      <div>{props.label}</div>
    </div>
  );
};
