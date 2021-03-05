import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';

import Post from '../../components/Post';
import WritePost from '../../components/WritePost';
import postJSON from '../../assets/posts.json';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';

const HomePage = ({ history }) => {
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

  const renderPosts = () => {
    return postJSON.posts.map((post) => {
      return (
        <Post post={post} />
      )
    });
  };

  return (<>
    <Title />

    <div className="HomePage">
      <WritePost />
      {renderPosts()}
      <div style={{ height: '75px' }} />
    </div>

    <Navbar />
  </>);
}

export default HomePage;