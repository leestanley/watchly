import React, { useState } from 'react';
import { Select } from 'antd';
import './style.scss';

const { Option } = Select;

const List = ({ list }) => {
    const [filterRating, setFilterRating] = useState('highest');

    // function for setting filter for ratings
    const handleFilterRating = (value) => {
        setFilterRating(value);
    }

    // function for rendering prop for list of shows/movies watched
    const renderList = () => {
        let cards;
        if (filterRating === 'highest') {
            cards = list.slice().sort((a, b) => b.rating - a.rating);
        } else {
            cards = list.slice().sort((a, b) => a.rating - b.rating);
        }

        return cards.map((card, index) => {
            // create a component for card later
            return (
                <div className="ListCard" key={index}>
                    <div className="card-left">
                        <p className="card-ranking">{card.ranking}.</p>
                        <img className="card-img" src={card.img} alt="card"></img>
                        <div className="card-info">
                            <p className="card-title">{card.title}</p>
                            <p className="card-date">{card.date}</p>
                        </div>
                    </div>
                    <div className="card-right">
                        <p className="card-rating">{card.rating}</p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="List">
            <div className="filter-bar">
                <h2 className="filter-title">Filter</h2>
                <Select defaultValue="highest" style={{ width: 100, height: 30 }} onChange={handleFilterRating}>
                    <Option value="highest">Highest</Option>
                    <Option value="lowest">Lowest</Option>
                </Select>
            </div>
            <div className="list-cards">
                {renderList()}
            </div>
        </div>
    );
};

export default List;