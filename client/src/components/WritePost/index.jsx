import React from 'react';
import { PictureOutlined, StarOutlined, FundOutlined } from '@ant-design/icons';

import './style.scss';

const WritePost = () => {
    return (
        <div className="write-post-container">
            <h3 className="write-post-header">Write a post</h3>
            <input className="post-input" placeholder="I love Start Up!"></input>
            <div className="post-options">
                <div className="upload-pic">
                    <PictureOutlined />
                    <p className="post-option-text">Upload Picture</p>
                </div>
                <div className="submit-review">
                    <StarOutlined />
                    <p className="post-option-text">Submit Review</p>
                </div>
                <div className="share-episode">
                    <FundOutlined />
                    <p className="post-option-text">Share Episode</p>
                </div>
            </div>
        </div>
    );
};

export default WritePost;