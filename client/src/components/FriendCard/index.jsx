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
          season={3}
          episode={2}
        />
        <Friend
          pic={defaultProfilePic}
          name="Alan Cao"
          season={23}
          episode={9}
        />
        <Friend
          pic={defaultProfilePic}
          name="Danny Nguyen"
          season={1}
          episode={2}
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
      <p>season {props.season}</p>
      <p>season {props.episode}</p>
    </div>
  );
};

export default FriendCard;
