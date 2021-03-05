import React, { useState } from 'react';
import { Select } from 'antd';
import ListCard from '../ListCard';
import './style.scss';

const { Option } = Select;

const Results = ({ list, handleUpdate }) => {
  const [sortRating, setSortRating] = useState('Movie');

  const renderList = () => {
    let cards;
    if (sortRating === 'Movie') {
      cards = null;
    } else {
      cards = null;
    }

    return cards.map((card, index) => {
      return (
        <ListCard
          card={card}
          key={index}
          ranking={index + 1}
          updateList={handleUpdate}
        />
      );
    });
  };


  return (
    <div className="Props">
      <div className="sort-bar">
        <h2 className="sort-title">Results</h2>
      </div>
      <div className="list-cards">Placeholder</div>
      
    </div>
  );
};

export default Results;
