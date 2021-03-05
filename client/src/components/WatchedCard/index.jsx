import './style.scss';

const WatchedCard = (props) => {
  return (
    <div className="WatchedCard">
      <img src={props.image} alt="show" className="paincard"/>
      <h3>{props.title}</h3>
      <p>{props.date}</p>
    </div>
  );
};

export default WatchedCard;
