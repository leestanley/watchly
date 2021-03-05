import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import ListCard from '../ListCard';
import './style.scss';

const { Option } = Select;

const ShowList = ({ list, handleMediaChange, type }) => {
  const [mediaType, setMediaType] = useState(type);

  // function for setting media type
  const handleMediaTypeChange = (value) => {
    // call callback
    if (handleMediaChange)
      handleMediaChange(value);
  };

  const renderList = () => {
    return list.map((card, i) => {
      return (
        <Link to={`/view?id=${card.id}`} style={{color: 'black'}}>
          <ListCard
            key={i}
            ranking={i + 1}
            card={card}
            disableModal={true}
          />
        </Link>);
    });
  };

  return (
    <div className="List">
      <div className="sort-bar">
        <h2 className="sort-title">Trending</h2>
        <Select
          defaultValue={mediaType}
          style={{ width: 125, height: 30 }}
          onChange={handleMediaTypeChange}
        >
          <Option value="movie">Movie</Option>
          <Option value="tv">TV Show</Option>
        </Select>
      </div>
      {<div className="list-cards">{renderList()}</div>}
    </div>
  );
};

export default ShowList;