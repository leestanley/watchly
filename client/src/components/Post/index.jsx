import { Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import CommentSection from '../CommentSection';

import './style.scss';

const Post = ({ post }) => {
  const renderPostTags = () => {
    return post.tags.map((tag) => {
      return (
        <Button style={{ marginRight: '3px' }} shape="round" size="small">
          {tag}
        </Button>
      );
    });
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="poster-info">
          <img className="poster-pic" src={post.user.pfp} alt="Profile"></img>
          <div className="poster-details">
            <p className="poster-name">{post.user.name}</p>
            <p className="post-time">{post.user.date}</p>
          </div>
        </div>
        <EllipsisOutlined className="more-icon" />
      </div>
      <div className="post-body">
        <div className="post-main">
          <div>
            <img
              className="post-img"
              src={post.movie.poster}
              alt="Title poster"
            />
            <div className="post-tags">
              {renderPostTags()}
            </div>
          </div>
          <div className="post-content">
            <div className="content-header">
              <div className="content-details">
                <p className="content-title">{post.movie.name}</p>
                <p className="content-date">{post.movie.date}</p>
              </div>
              <p className="post-rating">{post.movie.rating}/10</p>
            </div>
            <div className="post-text">
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
      <CommentSection commentList={post.comments} />
    </div>
  );
};

export default Post;
