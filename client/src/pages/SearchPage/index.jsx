import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';

import './style.scss';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';

import SearchCard from '../../components/SearchCard';
import ShowCard from '../../components/ShowCard';
import FriendCard from '../../components/FriendCard';
import Post from '../../components/Post';
import postJSON from '../../assets/posts.json';

function SearchPage({ history }) {
  const [user, loading, error] = useAuthState(fbase.auth);

  let search = window.location.search;
  let params = new URLSearchParams(search);

  let id = undefined;
  const loadResults = async () => {
    console.log(id);
  };

  useEffect(() => {
    // make sure they're logged in
    if (loading || !user) return;

    // retrieve results
    loadResults();
  }, [loading]);

  if (!params.has('id') || params.get('id').trim().length === 0) {
    history.push('/home');

    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    );
  }

  id = params.get('id');

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

  const renderPosts = () => {
    return postJSON.posts.map((post) => {
      return (
        <Post post={post} />
      )
    });
  };

  return (<>
    <Title />

    <div className="SearchPage">
      <SearchCard title="Search for a TV Show or Movie" />
      <ShowCard />
      <h2 style={{ marginTop: '2vh' }}>Global Reviews</h2>
      {/* renderPosts() */}
      <div style={{ height: '75px' }} />
    </div>

    <Navbar />
  </>);
}

export default SearchPage;
