import React, { useState } from 'react';
import { Modal, Button, Slider, InputNumber } from 'antd';
import movieJSON from '../../assets/movies.json';
import './style.scss';

const ListCard = ({ card, ranking, updateList, disableModal }) => {
    disableModal = (disableModal || false); // default

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [rating, setRating] = useState(card.rating);

    const marks = {
        0: '0',
        10: {
            style: {
                color: '#000'
            },
            label: '10'
        }
    };

    const showModal = () => {
        if (disableModal) return;
        setIsModalVisible(true);
    };
    
    const handleRemove = () => {
        // add stuff to remove
        movieJSON.movies = movieJSON.movies.filter((movie) => movie.title !== card.title);
        updateList();
        setIsModalVisible(false);
    };

    const handleSave = () => {
        // add stuff to save
        movieJSON.movies.forEach((movie) => {
            if (movie.title === card.title)
                movie.rating = rating;
        });

        updateList();
        setIsModalVisible(false);
    };

    const handleCancel = () => setIsModalVisible(false);
    const handleFavorite = () => setIsFavorite(!isFavorite);
    const handleRating = (value) => setRating(value);
    const renderFavorite = () => <Button type="primary" shape="round" onClick={handleFavorite}>{isFavorite ? 'Remove': 'Add'} Favorite</Button>;

    return (
        <>
            <div className="ListCard" onClick={showModal}>
                <div className="card-left">
                    <p className="card-ranking">{ranking}.</p>
                    <img className="card-img" src={card.img} alt="card"></img>
                    <div className="card-info">
                        <p className="card-title">{card.title}</p>
                        <p className="card-date">{card.date}</p>
                    </div>
                </div>
                <div className="card-right">
                    <p className="card-rating">{card.rating === 0 ? "N/A" : card.rating}</p>
                </div>
            </div>
            <Modal
                title="Edit & Rate Your Show/Movie"
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={handleCancel}
                footer={[
                    <Button key="Cancel" shape="round" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" shape="round" onClick={handleRemove}>
                        Remove from list
                    </Button>,
                    <Button key="submit" type="primary" shape="round" onClick={handleSave}>
                        Save
                    </Button>
                ]}
            >
                <div className="Modal">
                    <div className="modal-body">
                        <img className="modal-img" src={card.img} alt="modal img"></img>
                        <div className="modal-content">
                            <div className="modal-content-header">
                                <div className="modal-content-title">
                                    <p className="content-title">{card.title}</p>
                                    <p className="content-date">{card.date}</p>
                                </div>
                            </div>
                            <p className="modal-content-text">{card.content}</p>
                            {renderFavorite()}
                        </div>
                    </div>
                    <div className="modal-rating">
                        <div className="rating-top">
                            <h2>Your Rating</h2>
                            <Slider
                                min={0}
                                max={10}
                                marks={marks}
                                defaultValue={card.rating}
                                onChange={handleRating}
                                style={{ width: 330 }}
                                value={rating}
                            />
                        </div>
                        <InputNumber min={0} max={10} defaultValue={card.rating} value={rating} onChange={handleRating} />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ListCard;