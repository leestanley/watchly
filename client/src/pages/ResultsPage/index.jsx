import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';
import { decode } from 'js-base64';

import './style.scss';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import ListCard from '../../components/ListCard';
import SearchCard from '../../components/SearchCard';

function ResultsPage({ history }) {
  const [user, loading, error] = useAuthState(fbase.auth);

  useEffect(() => {
    // make sure they're logged in
    if (loading || !user) return;

    // retrieve trending data
  }, []);

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

  const renderList = () => {
    let cards;

    return cards.map((card, index) => {
      return <ListCard card={card} key={index} ranking={index + 1} />;
    });
  };

  let search = window.location.search;
  let params = new URLSearchParams(search);

  if (!params.has('q') || params.get('q').trim().length === 0) {
    history.push('/home');

    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    );
  }

  const onSearch = (value) => {
    if (value.trim().length > 0) history.push(`/results?q=${value}`);
  };

  return (
    <>
      <Title />
      <div className="ResultPage">
        <SearchCard title="Search for a TV Show or Movie" onSubmit={onSearch} />
        <div className="sort-bar">
          <h2 className="sort-title">Results</h2>
        </div>
        <div className="list-cards">Placeholder</div>
        <div style={{ height: '75px' }} />
      </div>
      <Navbar />
    </>
  );
}

export default ResultsPage;
