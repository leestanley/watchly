import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { notification } from 'antd';
import fbase from '../../firebase';
import API from '../../API';

import './style.scss';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';

import SearchCard from '../../components/SearchCard';
import ShowCard from '../../components/ShowCard';
import FriendCard from '../../components/FriendCard';
import Post from '../../components/Post';
import postJSON from '../../assets/posts.json';

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

function SearchPage({ history }) {
  const [user, loading, error] = useAuthState(fbase.auth);
  const [loadingData, setLoadingData] = useState(false);
  const [resultData, setResultData] = useState({});
  const [resultPostData, setResultPostData] = useState([]);

  const forceUpdate = useForceUpdate();

  let search = window.location.search;
  let params = new URLSearchParams(search);

  let id = undefined;
  const loadResults = async () => {
    // console.log(id);
    setLoadingData(true);

    try {
      console.log(id);
      let searchResult = await API.getMedia(id);
      let data = searchResult.data;

      if (data.success) {
        setResultData(data.details);
      } else {
        notification.error({
          message: 'Error',
          description: data.message
        });
      }

      let postResults = await API.getPostsWithMedia(id);
      data = postResults.data;
      if (data.success) {
        setResultPostData(data.posts);
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
    console.log(resultData);
    console.log(resultPostData);
    setLoadingData(false);
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
    return resultPostData.map((post) => {
      return (
        <Post post={post} key={post.post_id} updatePosts={forceUpdate} />
      )
    });
  };

  const onSearch = (value) => {
    if (value.trim().length > 0)
      history.push(`/results?q=${value}`);
  };

  return (<>
    <Title />

    <div className="SearchPage">
      <SearchCard title="Search for a TV Show or Movie" onSubmit={onSearch} />
      {loadingData ? <div id="loading">
        <br />
        <p>Loading results...</p>
      </div> : <ShowCard card={resultData} />}
      <h2 style={{ marginTop: '2vh' }}>Global Reviews</h2>
      {loadingData ? <div id="loading">
        <br />
        <p>Loading global reviews...</p>
      </div> : renderPosts()}
      <div style={{ height: '75px' }} />
    </div>

    <Navbar />
  </>);
}

export default SearchPage;
