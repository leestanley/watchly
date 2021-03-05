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
    history.push('/');

    // we have to return something so we'll return an empty page.
    return <div></div>;
  }

  let search = window.location.search;
  let params = new URLSearchParams(search);

  if (!params.has('id') || params.get('id').trim().length === 0) {
    history.push('/home');

    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    );
  }

  const id = params.get('id');

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
      {renderPosts()}
      <div style={{ height: '75px' }} />
    </div>

    <Navbar />
  </>);
}

export default SearchPage;
