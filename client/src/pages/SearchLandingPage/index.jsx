import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';
import API from '../../API';

import './style.scss';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import ShowList from '../../components/ShowList';

import SearchCard from '../../components/SearchCard';

function SearchLandingPage({ history }) {
  const [loadingData, setLoadingData] = useState(false);
  const [mediaType, setMediaType] = useState('movie');
  const [trendingData, setTrendingData] = useState([]);
  const [user, loading, error] = useAuthState(fbase.auth);

  const mediaTypeChanged = (value) => {
    console.log(`type: ${value}`);
    setMediaType(value);
    loadTrending();
  };

  const loadTrending = async () => {
    setLoadingData(true);

    try {
      let trendingResult = await API.getTrendingMedia(mediaType);
      let data = trendingResult.data;

      if (data.success) {
        let list = [];
        data.list.forEach(d => {
          list.push({
            id: d.id,
            title: d.title,
            date: d.releaseDate,
            img: d.poster,
            rating: d.voteAverage
          });
        });

        setTrendingData(list);
      } else {
        notification.error({
          message: 'Error',
          description: data.message
        });
      }
    } catch (e) {
      notification.error({
        message: 'Error',
        description: e.message
      });
    }

    setLoadingData(false);
  };

  useEffect(() => {
    // make sure they're logged in
    if (loading || !user) return;

    // retrieve trending data
    loadTrending();
  }, [loading]);

  if (loading) {
    // can replace?
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    // can replace?
    return (
      <div>
        <p>
          Error: <b>{error}</b>
        </p>
      </div>
    );
  }

  if (!user) {
    // not logged in
    history.push('/');

    // we have to return something so we'll return an empty page.
    return <div></div>;
  }

  return (
    <>  
      <Title />
      <div className="SearchLandingPage">
        <SearchCard title="Search for a TV Show or Movie" />
        { loadingData ? <p>Loading trends...</p> : <ShowList list={trendingData} handleMediaChange={mediaTypeChanged} type={mediaType} />}
        <div style={{ height: '75px' }} />
      </div>
      <Navbar />
    </>
  );
}

export default SearchLandingPage;
