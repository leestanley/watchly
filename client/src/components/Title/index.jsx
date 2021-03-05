import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { notification } from 'antd';
import fbase from '../../firebase';
import API from '../../API';
import './style.scss';

import defaultProfilePic from '../../assets/default_profile.png';
function Title({ username }) {
    const [user, loading, error] = useAuthState(fbase.auth);
    const [profilePicture, setProfilePicture] = useState('');
    const [loadingData, setLoadingData] = useState(true);

    const loadProfilePicture = async () => {
        setLoadingData(true);

        if (username === undefined) {
            let userResult = await API.getInfoFromEmail(user.email);
            let profileData = userResult.data;
            
            if (profileData.success) {
                profileData = profileData.data;
                setProfilePicture(profileData.profilePicture);
            } else {
                setProfilePicture(defaultProfilePic);
                notification.error({
                    message: 'Error loading profile picture',
                    description: profileData.message
                });
            }
        } else {
            let userResult = await API.getUser(username);
            let profileData = userResult.data;
            
            if (profileData.success) {
                profileData = profileData.user;
                setProfilePicture(profileData.profilePicture);
            } else {
                setProfilePicture(defaultProfilePic);
                notification.error({
                    message: 'Error loading profile picture',
                    description: profileData.message
                });
            }
        }
        
        setLoadingData(false);
    };

    useEffect(() => {
        // make sure they're logged in
        if (loading || !user) return;
    
        // retrieve profile picture
        loadProfilePicture();
      }, [loading, username]);

    return (
        <div className="TitleCard">
            <h2>Watchly</h2>
            {!loadingData && <img src={profilePicture} className="profilePicture" alt="profile-pic" />}
        </div>
    );
}

export default Title;