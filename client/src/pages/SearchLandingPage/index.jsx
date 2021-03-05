import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';

import './style.scss';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';

import SearchCard from '../../components/SearchCard';

function SearchLandingPage({ history }) {
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

  return (
    <>
      <Title />

      <div className="SearchPage">
        <SearchCard title="Search for a TV Show or Movie" />
        <div style={{ height: '75px' }} />
      </div>

      <Navbar />
    </>
  );
}

export default SearchLandingPage;