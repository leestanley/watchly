import React, { useState } from 'react';
import { Select } from 'antd';
import ListCard from '../ListCard';
import './style.scss';

const { Option } = Select;

const ShowList = ({ list, handleUpdate }) => {
  const [sortRating, setSortRating] = useState('Movie');

  // function for setting sort for ratings
  const handleSortRating = (value) => {
    setSortRating(value);
  };

  // function for rendering prop for list of shows/movies watched
//   const renderList = () => {
//     let cards;
    // if (sortRating === 'highest') {
    //   cards = list.slice().sort((a, b) => b.rating - a.rating);
    // } else {
    //   cards = list.slice().sort((a, b) => a.rating - b.rating);
    // }

    // return cards.map((card, index) => {
    //   return (
    //     <ListCard
    //       card={card}
    //       key={index}
    //       ranking={index + 1}
    //       updateList={handleUpdate}
    //     />
//       );
//     });
//   };

  return (
    <div className="List">
      <div className="sort-bar">
        <h2 className="sort-title">Sort</h2>
        <Select
          defaultValue="Movie"
          style={{ width: 100, height: 30 }}
          onChange={handleSortRating}
        >
          <Option value="Movie">Movie</Option>
          <Option value="TV Show">TV Show</Option>
        </Select>
      </div>
      {/* <div className="list-cards">{renderList()}</div> */}
    </div>
  );
};

export default ShowList;
