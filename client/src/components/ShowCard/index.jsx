import React, { useState } from 'react';
import { Modal, Button, Slider, InputNumber } from 'antd';
import movieimg from '../../assets/spacejam.jpg';
import movieJSON from '../../assets/movies.json';

import './style.scss';

const ShowCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(5);

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
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    // add stuff to save
    movieJSON.movies.push({
      "title": "Man of Steel",
      "date": "2013",
      "img": "https://i.imgur.com/pNTI29P.jpeg",
      "rating": rating,
      "content": "Man of Steel is a reboot of the Superman film series that portrays the character's origin story.In the film, Clark Kent learns that he is a superpowered alien from the planet Krypton.He assumes the role of mankind's protector as Superman, making the choice to face General Zod and prevent him from destroying humanity."
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
      return <Button type="primary" shape="round" onClick={handleFavorite}>Remove Favorite</Button>
    } else {
      return <Button type="primary" shape="round" onClick={handleFavorite}>Add Favorite</Button>
    }
  };

  return (
    <div className="show-container">
      <div className="post-body">
        <div className="post-main">
          <img className="post-img" src={movieimg} alt="Title poster"></img>
          <div className="post-content">
            <div className="content-header">
              <div className="content-details">
                <p className="content-title">Man of Steel</p>
                <p className="content-date">2013</p>
              </div>
              <div className="show-rating">
                <p className="post-rating">7.2/10</p>
                <p className="sub-rating">global avg.</p>
              </div>
            </div>
            <div className="post-text">
              <p>
                Man of Steel is a reboot of the Superman film series that portrays the character's origin story.In the film, Clark Kent learns that he is a superpowered alien from the planet Krypton.He assumes the role of mankind's protector as Superman, making the choice to face General Zod and prevent him from destroying humanity.
              </p>
            </div>
          </div>
        </div>
        <div className="post-tags">
          <Button shape="round" size="medium" onClick={showModal}>
            Add to List >
          </Button>
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
          </Button>
        ]}
      >
        <div className="Modal">
          <div className="modal-body">
            <img className="modal-img" src={movieimg} alt="modal img"></img>
            <div className="modal-content">
              <div className="modal-content-header">
                <div className="modal-content-title">
                  <p className="content-title">Man of Steel</p>
                  <p className="content-date">2013</p>
                </div>
              </div>
              <p className="modal-content-text">Man of Steel is a reboot of the Superman film series that portrays the character's origin story.In the film, Clark Kent learns that he is a superpowered alien from the planet Krypton.He assumes the role of mankind's protector as Superman, making the choice to face General Zod and prevent him from destroying humanity.</p>
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
            <InputNumber min={0} max={10} value={rating} onChange={handleRating} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowCard;
