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
    history.push('/home');

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
      <FriendCard />
      <h2 style={{ marginTop: '2vh' }}>Global Reviews</h2>
      {renderPosts()}
      <div style={{ height: '75px' }} />
    </div>

    <Navbar />
  </>);
}

export default SearchPage;
