import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';
import API from '../../API';

import './style.scss';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import TrendingList from '../../components/TrendingList';

import SearchCard from '../../components/SearchCard';

function SearchLandingPage({ history }) {
  const [loadingData, setLoadingData] = useState(false);
  const [mediaType, setMediaType] = useState('movie');
  const [trendingData, setTrendingData] = useState([]);
  const [user, loading, error] = useAuthState(fbase.auth);

  const mediaTypeChanged = (value) => loadTrending(value);
  const loadTrending = async (value) => {
    setLoadingData(true);
    setMediaType(value);

    try {
      let trendingResult = await API.getTrendingMedia(value);
      let data = trendingResult.data;

      if (data.success) {
        let list = [];
        data.list.forEach(d => {
          list.push({
            id: d.id,
            title: d.title,
            date: (d.releaseDate.length > 0) ? d.releaseDate.substring(0, 4) : "N/A",
            img: d.poster,
            rating: (d.voteAverage == 0) ? "N/A" : d.voteAverage
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
    loadTrending('movie');
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

  const onSearch = (value) => {
    if (value.trim().length > 0)
      history.push(`/search?q=${value}`);
  };

  return (
    <>  
      <Title />
      <div className="SearchLandingPage">
        <SearchCard title="Search for a TV Show or Movie" onSubmit={onSearch} />
        { loadingData ? <div id="loading">
          <br />
          <p>Loading trends...</p>
        </div> : <TrendingList list={trendingData} handleMediaChange={mediaTypeChanged} type={mediaType} />}
        <div style={{ height: '75px' }} />
      </div>
      <Navbar />
    </>
  );
}

export default SearchLandingPage;
