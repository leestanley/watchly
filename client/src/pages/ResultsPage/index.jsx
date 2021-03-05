import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';
import API from '../../API';

import './style.scss';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import ListCard from '../../components/ListCard';
import SearchCard from '../../components/SearchCard';
import ResultsList from '../../components/ResultsList';

function ResultsPage({ history }) {
  const [user, loading, error] = useAuthState(fbase.auth);
  const [loadingData, setLoadingData] = useState(false);
  const [resultsData, setResultsData] = useState([]);

  let search = window.location.search;
  let params = new URLSearchParams(search);

  let q = undefined;
  const loadSearchResults = async () => {
    setLoadingData(true);
    try {
      let searchResults = await API.search(q);
      let data = searchResults.data;

      if (data.success) {
        let list = [];
        data.list.forEach((d) => {
          list.push({
            id: d.id,
            title: d.title,
            date: d.releaseDate.length > 0 ? d.releaseDate.substring(0, 4) : 'N/A',
            img: d.poster,
            rating: d.voteAverage == 0 ? 'N/A' : d.voteAverage,
          });
        });
        
        setResultsData(list);
      } else {
        notification.error({
          message: 'Error',
          description: data.message,
        });
      }
    } catch (e) {
      notification.error({
        message: 'Error',
        description: e.message,
      });
    }
    setLoadingData(false);
  };

  useEffect(() => {
    // make sure they're logged in
    if (loading || !user || !q) return;

    // retrieve search data
    loadSearchResults();
  }, [loading, q]);

  if (!params.has('q') || params.get('q').trim().length === 0) {
    history.push('/home');

    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    );
  }

  q = params.get('q');

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

  q = params.get('q');

  const onSearch = (value) => {
    if (value.trim().length > 0) {
      history.push(`/search?q=${value}`);
      window.location.reload();
    }
  };

  return (
    <>
      <Title />
      <div className="ResultPage">
        <SearchCard title="Search for a TV Show or Movie" onSubmit={onSearch} />
        {loadingData ? (
          <div id="loading">
            <br />
            <p>Loading results...</p>
          </div>
        ) : (
          <>
            {resultsData.length === 0 ? (
              <div>
                <div className="sort-bar">
                  <h2 className="sort-title">Results</h2>
                </div>
                <div className="sadcat">
                  <h3>No results found.</h3>
                  <img
                    src="https://media.giphy.com/media/THgdxkFUCAi9vFfba6/giphy.gif"
                    alt="oh no"
                    height="200px"
                  />
                </div>
              </div>
            ) : (
              <ResultsList list={resultsData} />
            )}
          </>
        )}
        <div style={{ height: '75px' }} />
      </div>
      <Navbar />
    </>
  );
}

export default ResultsPage;