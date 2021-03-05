import { EllipsisOutlined } from '@ant-design/icons';
import CommentSection from '../CommentSection';
import { Menu, Dropdown } from 'antd';

import './style.scss';
import API from '../../API';

const Post = ({ post, updatePosts }) => {

  const handlePostMenu = ({ key }) => {
    if (key === 'delete') {
      API.deletePost(post.post_id).then(response => {
        updatePosts();
      })
    }
  };

  let postMenu;

  if (post.username === 'testtesttest') {
    let postMenuItems = (
      <Menu onClick={handlePostMenu}>
        <Menu.Item danger key="delete">
          Delete Post
        </Menu.Item>
      </Menu>
    );
    postMenu = (
      <Dropdown overlay={postMenuItems}>
        <EllipsisOutlined className="more-icon" />
      </Dropdown>
    );
  } else {
    postMenu = null;
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="poster-info">
          <img className="poster-pic" src={post.user_info.profilePicture} alt="Profile"></img>
          <div className="poster-details">
            <p className="poster-name">{post.user_info.username}</p>
          </div>
        </div>
        {postMenu}
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
