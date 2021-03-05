import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';
import API from '../../API';

import Post from '../../components/Post';
import WritePost from '../../components/WritePost';
import postJSON from '../../assets/posts.json';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

const HomePage = ({ history }) => {
  const [user, loading, error] = useAuthState(fbase.auth);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    // make sure the user is logged in
    if (loading || !user) return;

    API.getPosts().then((response) => {
      setPosts(response.data.posts);
      setPostsLoading(false);
    });
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
      <div className="HomePage">
        <WritePost updatePosts={forceUpdate} />
        {postsLoading ? <div id="loading">
          <br />
          <p>Loading...</p>
        </div> : <>
          {posts.map((post) => {
            return <Post post={post} key={post.post_id} updatePosts={forceUpdate} />;
          })}
        </>}
        <div style={{ height: '75px' }} />
      </div>
      <Navbar />
    </>
  );
};

export default HomePage;
