import { Link } from 'react-router-dom';
import ListCard from '../ListCard';
import './style.scss';

const ResultsList = ({ list }) => {

  const renderList = () => {
    return list.map((card, i) => {
      return (
        <Link to={`/results?id=${card.id}`} style={{ color: 'black' }}>
          <ListCard key={i} ranking={i + 1} card={card} disableModal={true} />
        </Link>
      );
    });
  };

  return (
    <div className="List">
      <div className="sort-bar">
        <h2 className="sort-title">Results</h2>
      </div>
      {<div className="list-cards">{renderList()}</div>}
    </div>
  );
};

export default ResultsList;
