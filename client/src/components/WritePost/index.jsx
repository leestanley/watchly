import React from 'react';
import { PictureOutlined, StarOutlined, FundOutlined } from '@ant-design/icons';

import './style.scss';

const WritePost = () => {
    return (
        <div className="write-post-container">
            <h2 className="write-post-header">Write a post</h2>
            <div className="write-post-form">
                <input className="post-input" placeholder="I love Start Up!"></input>
                <div className="post-options">
                    <p className="post-option-text"><PictureOutlined />Upload Picture</p>
                    <p className="post-option-text"><StarOutlined />Submit Review</p>
                    <p className="post-option-text"><FundOutlined />Share Episode</p>
                </div>
            </div>
        </div>
    );
};

export default WritePost;