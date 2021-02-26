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
                    <p className="post-option-text"><PictureOutlined style={{marginRight:"3px"}}/>Upload Picture</p>
                    <p className="post-option-text"><StarOutlined style={{marginRight:"3px"}}/>Submit Review</p>
                    <p className="post-option-text"><FundOutlined style={{marginRight:"3px"}}/>Share Episode</p>
                </div>
            </div>
        </div>
    );
};

export default WritePost;