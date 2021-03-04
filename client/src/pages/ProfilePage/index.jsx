import UserSettings from '../../components/UserSettings';

import './style.scss';

import Title from '../../components/Title';
import profilebg from '../../assets/profilebg.svg';

function ProfilePage(props) {
  return (
    <div className="ProfilePage">
      <Title />
      <div className="header">
        <h1>Your Profile</h1>
        <UserSettings self={true} />
      </div>
      <img src={profilebg} alt="bg" className="profilebg" />
    </div>
  );
}

export default ProfilePage;
