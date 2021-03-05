import React, { useState } from 'react';
import { Modal, Button, Slider, InputNumber } from 'antd';
import movieimg from '../../assets/spacejam.jpg';
import movieJSON from '../../assets/movies.json';

import './style.scss';

const ShowCard = ({ card }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(5);

  const marks = {
    0: '0',
    10: {
      style: {
        color: '#000',
      },
      label: '10',
    },
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    // add stuff to save
    movieJSON.movies.push({
      title: card.title,
      date: card.releaseDate.slice(0, 4),
      img: card.poster,
      rating: rating,
      content: card.description,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const renderFavorite = () => {
    if (isFavorite) {
      return (
        <Button type="primary" shape="round" onClick={handleFavorite}>
          Remove Favorite
        </Button>
      );
    } else {
      return (
        <Button type="primary" shape="round" onClick={handleFavorite}>
          Add Favorite
        </Button>
      );
    }
  };

  return (
    <div className="show-container">
      <div className="post-body">
        <div className="post-main">
          <div>
            <img className="post-img" src={card.poster} alt="Title poster" />
            <Button
              className="addlist"
              shape="round"
              size="medium"
              onClick={showModal}
            >
              Add to List >
            </Button>
          </div>
          <div className="post-content">
            <div className="content-header">
              <div className="content-details">
                <p className="content-title">{card.title}</p>
                <p className="content-date">{card.releaseDate.slice(0, 4)}</p>
              </div>
              <div className="show-rating">
                <p className="post-rating">{card.voteAverage}/10</p>
                <p className="sub-rating">global avg.</p>
              </div>
            </div>
            <div className="post-text">
              <p>
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add & Rate Your Show/Movie"
        visible={isModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
        footer={[
          <Button key="Cancel" shape="round" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" shape="round" onClick={handleAdd}>
            Add
          </Button>,
        ]}
      >
        <div className="Modal">
          <div className="modal-body">
            <img className="modal-img" src={card.poster} alt="modal img"></img>
            <div className="modal-content">
              <div className="modal-content-header">
                <div className="modal-content-title">
                  <p className="content-title">{card.title}</p>
                  <p className="content-date">{card.releaseDate.slice(0, 4)}</p>
                </div>
              </div>
              <p className="modal-content-text">
                {card.description}
              </p>
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
                defaultValue={rating}
                onChange={handleRating}
                style={{ width: 330 }}
                value={rating}
              />
            </div>
            <InputNumber
              min={0}
              max={10}
              value={rating}
              onChange={handleRating}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowCard;
