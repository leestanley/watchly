import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Modal, Button, Slider, InputNumber, notification } from 'antd';

import fbase from '../../firebase';
import profileJSON from '../../assets/profiles.json';
import movieJSON from '../../assets/movies.json';

import './style.scss';

const getProfile = (email) => {
  for (let i = 0; i < profileJSON.profiles.length; i++) {
    let profile = profileJSON.profiles[i];
    if (profile.email === email) return profile;
  }

  return profileJSON.profiles[profileJSON.profiles.length - 1];
};

const ShowCard = ({ card }) => {
  const [user, loading, error] = useAuthState(fbase.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [rating, setRating] = useState(5);

  if (loading) return <></>;

  // load favorite value, if possible
  let profile = getProfile(user.email);
  if (profile !== null) {
    let val = profile.favorites.some(m => m.title === card.title);
    if (val !== isFavorite)
      setIsFavorite(val);
  }

  const marks = {
    0: '0',
    10: {
      style: {
        color: '#000',
      },
      label: '10',
    },
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const handleRating = (value) => setRating(value);

  const handleAdd = () => {
    let proceed = true;
    // check for duplicates
    for (let i = 0; i < movieJSON.movies.length; i++) {
      if (movieJSON.movies[i].title === card.title) {
        proceed = false;
        break;
      }
    }

    if (!proceed) {
      notification.error({
        message: 'Error Adding',
        description: `"${card.title}" is already in your list!`
      });

      setIsModalVisible(false);
      return;
    }

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

  const handleFavorite = () => {
    if (isFavorite) {
      // remove favorite
      profile = getProfile(user.email);
      if (profile !== null) {
        profile.favorites = (profile.favorites || []);
        profile.favorites = (profile.favorites.filter(m => m.title !== card.title));
      }
        
      setIsFavorite(false);
    } else {
      // add favorite
      profile = getProfile(user.email);
      if (profile !== null) {
        profile.favorites = (profile.favorites || []);

        profile.favorites.push({
          title: card.title,
          releaseDate: card.releaseDate,
          poster: card.poster
        });
      }
      
      setIsFavorite(true);
    }
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
              Add to List &gt;
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
                {card.description < 220 ? card.description : card.description.slice(0, 210).trim() + '...'}
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
