import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import fbase from '../../firebase';

import SearchCard from '../../components/SearchCard';
import List from '../../components/List';
import './style.scss';
import movieJSON from '../../assets/movies.json';

import Title from '../../components/Title';
import Navbar from '../../components/Navbar';

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

const ListPage = ({ history }) => {
    const [user, loading, error] = useAuthState(fbase.auth);

    const forceUpdate = useForceUpdate();

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

    return (<>
        <Title />

        <div className="ListPage">
            <SearchCard title="Your TV Shows and Movies" />
            <List list={movieJSON.movies} handleUpdate={forceUpdate} />
        </div>

        <Navbar />
    </>);
}

export default ListPage;