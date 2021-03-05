import './style.scss';

const Statistics = (props) => {
  return (
    <div className="Statistics">
      <div className={"border " + props.color} />
      <div className="text">
        <h2><strong>{props.number}</strong></h2>
        <p>{props.name}</p>
      </div>
    </div>
  );
};

export default Statistics;
