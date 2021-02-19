import './style.scss';

import defaultProfilePic from '../../assets/default_profile.png'

function Title() {
    return (
        <div class="TitleCard">
            <h2>Watchly</h2>
            <img src={defaultProfilePic} className="profilePicture" alt="profile-pic" />
        </div>
    );
}

export default Title;