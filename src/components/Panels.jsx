export function Panels(props) {
  const { panels } = props;

  return (
    <div className="w-3/4 max-w-xl mx-auto pb-20">
      {panels.map((panel) => (
        <div
          key={panel.id}
          className="my-4 p-4 bg-white bg-opacity-60 rounded-lg"
        >
          <h1>{panel.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default Panels;
