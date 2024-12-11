const Playground = ({ json }) => {
  return (
    <div>
      <h2>Playground</h2>
      <p>{JSON.stringify(json, null, 2)}</p>
    </div>
  );
};

export default Playground;
