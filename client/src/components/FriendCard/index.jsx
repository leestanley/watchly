import './style.scss';

import defaultProfilePic from '../../assets/default_profile.png';

const FriendCard = () => {
  return (
    <div className="FriendCard">
      <h2 className="title">Friends Currently Watching</h2>
      <div className="f-row">
        <Friend
          pic={defaultProfilePic}
          name="Jeffrey Ha"
        />
        <Friend
          pic={defaultProfilePic}
          name="Alan Cao"
        />
        <Friend
          pic={defaultProfilePic}
          name="Danny Nguyen"
        />
      </div>
    </div>
  );
};

const Friend = (props) => {
  return (
    <div className="Friend">
      <img className="profilePicture" src={props.pic} alt="profile" />
      <h4>{props.name}</h4>
    </div>
  );
};

export default FriendCard;
