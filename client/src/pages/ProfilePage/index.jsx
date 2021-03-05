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

import './style.scss';

function ProfilePage({
  history,
  match: {
    params: { id },
  },
}) {
  const [user, loading, error] = useAuthState(fbase.auth);
  const isAdmin = id === undefined;

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
          <h2 className="t-friends">Friends (231)</h2>
          <img src={friends} alt="friends" />
        </div>
        <div className="profile-body">
          <h2>Watched Stats</h2>
          <div className="Row-Stats">
            <Statistics color="orange" number={2223} name="Hours Watched" />
            <Statistics color="blue" number={62} name="Shows Watched" />
            <Statistics color="pink" number={12} name="Movies Watched" />
            <Statistics color="green" number={8} name="Genres" />
          </div>
          <h2 className="spacer">Favorite Movies & Shows</h2>
          <div className="Row-Watched">
            <WatchedCard
              image={blackmirror}
              title={'Black Mirror'}
              date={'2016'}
            />
            <WatchedCard image={startup} title={'Start Up'} date={'2020'} />
            <WatchedCard image={yourname} title={'Your Name'} date={'2016'} />
            <WatchedCard image={yourname} title={'Your Name'} date={'2016'} />
          </div>

          <h2 className="spacer">Currently Watching</h2>
          <div className="Row-Watched">
            <WatchedCard image={spongebob} title={'Spongebob'} date={'2004'} />
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
