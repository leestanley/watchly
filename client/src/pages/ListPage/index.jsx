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
  return () => {
    window.location.reload(); // temp
    setValue(value => value + 1);
  };
};

const ListPage = ({ history }) => {
    const [user, loading, error] = useAuthState(fbase.auth);
    const [movies, setMovies] = useState(movieJSON.movies);

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

    const onSearch = (value) => {
      if (value.trim().length === 0) {
        setMovies(movieJSON.movies); // reset
      } else {
        value = value.toUpperCase();

        // now we search for potential results
        let results = movieJSON.movies.filter(m => (m.title.toUpperCase().indexOf(value) > -1));
        setMovies(results);
      }
    };

    return (<>
        <Title />

        <div className="ListPage">
            <SearchCard title="Your TV Shows and Movies" onSubmit={onSearch} />
            <List list={movies} handleUpdate={forceUpdate} />
        </div>

        <Navbar />
    </>);
}

export default ListPage;