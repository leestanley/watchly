import React, { useState } from 'react';
import { Select } from 'antd';
import ListCard from '../ListCard';
import './style.scss';

const { Option } = Select;

const List = ({ list, handleUpdate }) => {
    const [sortRating, setSortRating] = useState('highest');

    // function for setting sort for ratings
    const handleSortRating = (value) => setSortRating(value);

    // function for rendering prop for list of shows/movies watched
    const renderList = () => {
        let cards;
        if (sortRating === 'highest')
            cards = list.slice().sort((a, b) => b.rating - a.rating);
        else
            cards = list.slice().sort((a, b) => a.rating - b.rating);

        return cards.map((card, index) => <ListCard card={card} key={index} ranking={index + 1} updateList={handleUpdate} />);
    };

    return (
        <div className="List">
            <div className="sort-bar">
                <h2 className="sort-title">Sort</h2>
                <Select defaultValue="highest" style={{ width: 100, height: 30 }} onChange={handleSortRating}>
                    <Option value="highest">Highest</Option>
                    <Option value="lowest">Lowest</Option>
                </Select>
            </div>
            <div className="list-cards">
                {renderList()}
            </div>
            <div className="space" style={{height: 75}}/>
        </div>
    );
};

export default List;