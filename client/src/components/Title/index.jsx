import './style.scss';
import defaultProfilePic from '../../assets/default_profile.png'

function Title() {
    return (
        <div class="title">
            Watchly
            <img src={defaultProfilePic} id="profilePicture" />
        </div>
    );
}

export default Title;