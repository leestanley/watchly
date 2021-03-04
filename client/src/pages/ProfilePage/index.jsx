import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';

import { Button } from 'antd';
import UserSettings from '../../components/UserSettings';
import Navbar from '../../components/Navbar';

import './style.scss';

import Title from '../../components/Title';
import profilebg from '../../assets/profilebg.svg';

function ProfilePage({ history }) {
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

  return (<>
    <div className="ProfilePage">
      <Title />
      <Button>ADD SHIT HERE</Button>
      <div className="header">
        <h1>Your Profile</h1>
        <UserSettings self={true} />
      </div>
      <img src={profilebg} alt="bg" className="profilebg" />
    </div>

    <Navbar />
  </>);
}

export default ProfilePage;
