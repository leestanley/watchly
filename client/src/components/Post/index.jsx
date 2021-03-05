import React, { useState, useEffect } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { notification } from 'antd';
import CommentSection from '../CommentSection';
import { Menu, Dropdown } from 'antd';

import fbase from '../../firebase';
import API from '../../API';

import './style.scss';

const Post = ({ post, updatePosts }) => {
  const [user, loading, error] = useAuthState(fbase.auth);
  const [selfUsername, setSelfUsername] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [postMenu, setPostMenu] = useState(null);
  
  const handlePostMenu = ({ key }) => {
    if (key === 'delete') {
      API.deletePost(post.post_id).then(response => {
        updatePosts();
      })
    }
  };

  const loadUsername = async () => {
    setLoadingData(true);
    let userResult = await API.getInfoFromEmail(user.email);
    let profileData = userResult.data;

    if (profileData.success) {
      profileData = profileData.data;
      setSelfUsername(profileData.username);

      if (post.username === profileData.username) {
        // it's the user!
        let postMenuItems = (
          <Menu onClick={handlePostMenu}>
            <Menu.Item danger key="delete">
              Delete Post
            </Menu.Item>
          </Menu>
        );

        setPostMenu(
          <Dropdown overlay={postMenuItems}>
            <EllipsisOutlined className="more-icon" />
          </Dropdown>
        );
      }
    } else {
      setSelfUsername('');
      notification.error({
        message: 'Error loading username',
        description: profileData.message
      });
    }

    setLoadingData(false);
  };

  useEffect(() => {
    // make sure they're logged in
    if (loading || !user) return;

    // retrieve user's username
    loadUsername();
  }, [loading]);

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="poster-info">
          {loadingData ? <img className="poster-pic" src={post.user_info.profilePicture} alt="Profile"></img> : <>
            <Link to={(post.user_info.username === selfUsername) ? '/profile' : `/profile/${post.user_info.username}`}>
              <img className="poster-pic" src={post.user_info.profilePicture} alt="Profile"></img>
            </Link>
          </>}
          <div className="poster-details">
            <p className="poster-name">{post.user_info.username}</p>
          </div>
        </div>
        {!loadingData && postMenu}
      </div>
      <div className="post-body">
        <div className="post-main">
          <div>
            <img
              className="post-img"
              src={post.details.poster}
              alt="Title poster"
            />
          </div>
          <div className="post-content">
            <div className="content-header">
              <div className="content-details">
                <p className="content-title">{post.details.title}</p>
                <p className="content-date">{post.details.releaseDate.slice(0, 4)}</p>
              </div>
              <p className="post-rating">{post.rating}/10</p>
            </div>
            <div className="post-text">
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
      <CommentSection commentList={post.comments} postID={post.post_id} updateComments={updatePosts} />
    </div>
  );
};

export default Post;
