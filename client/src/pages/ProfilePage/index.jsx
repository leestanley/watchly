import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';

import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import UserSettings from '../../components/UserSettings';
import Navbar from '../../components/Navbar';
import Statistics from '../../components/Statistics';
import WatchedCard from '../../components/WatchedCard';

import profilebg from '../../assets/profilebg.svg';
import friends from '../../assets/friends.png';

import addshow from '../../assets/movies/addshow.svg';
import spongebob from '../../assets/movies/spongebob.png';
import yourname from '../../assets/movies/yourname.png';
import drakejosh from '../../assets/movies/drakejosh.png';
import blackmirror from '../../assets/movies/blackmirror.png';
import startup from '../../assets/movies/startup.png';

import profileJSON from '../../assets/profiles.json';
import './style.scss';

const getProfileByEmail = (email) => {
  for (let i = 0; i < profileJSON.profiles.length; i++) {
    let profile = profileJSON.profiles[i];
    if (profile.email === email) return profile;
  }

  // return the default
  return profileJSON.profiles[profileJSON.profiles.length - 1];
};

const getProfileByUsername = (username) => {
  for (let i = 0; i < profileJSON.profiles.length; i++) {
    let profile = profileJSON.profiles[i];
    if (profile.username === username) return profile;
  }

  // return the default
  return profileJSON.profiles[profileJSON.profiles.length - 1];
};

function ProfilePage({
  history,
  match: {
    params: { id },
  },
}) {
  const [user, loading, error] = useAuthState(fbase.auth);
  const isAdmin = (id === undefined);

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

  const profile = (isAdmin ? getProfileByEmail(user.email) : getProfileByUsername(id));
  return (
    <>
      <div className="ProfilePage">
        <Title username={id} />
        <div className="Row">
          <h1>{isAdmin ? 'Your' : `${id}'s`} Profile</h1>
          {isAdmin && (
            <a href="/logout">
              <Button className="logout">Logout</Button>
            </a>
          )}
        </div>
        <div className="header">
          <UserSettings self={false} />
          <h2 className="t-friends">Friends ({profile.friendCount})</h2>
          <img src={friends} alt="friends" />
        </div>
        <div className="profile-body">
          <h2>Watched Stats</h2>
          <div className="Row-Stats">
            <Statistics color="orange" number={profile.watchedStats.hours} name="Hours Watched" />
            <Statistics color="blue" number={profile.watchedStats.shows} name="Shows Watched" />
            <Statistics color="pink" number={profile.watchedStats.movies} name="Movies Watched" />
            <Statistics color="green" number={profile.watchedStats.genres} name="Genres" />
          </div>
          <h2 className="spacer">Favorite Movies & Shows</h2>
          <div className="Row-Watched">
            {profile.favorites.map((m, idx) => {
              return <WatchedCard 
                image={m.poster}
                title={m.title}
                date={m.releaseDate.substring(0, 4)}
                key={idx}
              />;
            })}
          </div>

          <h2 className="spacer">Currently Watching</h2>
          <div className="Row-Watched">
            {profile.currently.map((m, idx) => {
              return <WatchedCard
                image={m.poster}
                title={m.title}
                date={m.releaseDate.substring(0, 4)}
                key={idx}
              />;
            })}
            <Link to="/trending">
              <img src={addshow} alt="addshow" className="addshow" />
            </Link>
          </div>
        </div>
        <img src={profilebg} alt="bg" className="profilebg" />
      </div>
      <div style={{ height: '75px' }} />
      <Navbar />
    </>
  );
}

export default ProfilePage;
