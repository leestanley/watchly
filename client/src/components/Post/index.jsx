import React from 'react';
import { Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import './style.scss';

const Post = () => {
    return(
        <div className="post-container">
            <div className="post-header">
                <div className="poster-info">
                    <img className="poster-pic"></img>
                    <div className="poster-details">
                        <p className="poster-name">Jeffrey Ha</p>
                        <p className="post-time">Posted 10m ago</p>
                    </div>
                </div>
                <EllipsisOutlined />
            </div>
            <div className="post-body">
                <img className="post-img"></img>
                <div className="post-content">
                    <div className="content-header">
                        <div className="content-details">
                            <p className="content-title">Space Jam</p>
                            <p className="content-date">2018</p>
                        </div>
                        <p className="post-rating">7.2/10</p>
                    </div>
                    <div className="post-text">
                        <p>I really liked how Henry Chan dunked on Danny Nguyen in this one. Like who would have expected that
                        omega fire 2 pointer on that poggers jump. Overall, good movie, I would recommend it to friends who love volleyball and cooking.<br/><br/><b>Animation:</b> 9/10<br/><b>Story:</b> 8/10<br/><b>Acting:</b> 4/10</p>
                    </div>
                </div>
                <div className="post-tags">
                    <Button shape="round">Horror</Button>
                    <Button shape="round">Sci-Fi</Button>
                </div>
            </div>
            <div className="comment-section">
                <div className="comment">
                    <div className="comment-info">
                        <img className="commenter-pic"></img>
                        <div className="comment-details">
                            <p className="commenter-name">Alan Cao</p>
                            <p className="comment-content">Completely disagree, msg me on DM we can fite.</p>
                            <p className="comment-reply"><b>Reply</b> | 3m</p>
                        </div>
                    </div>
                    <EllipsisOutlined />
                </div>
                <div className="comment">
                    <div className="comment-info">
                        <img className="commenter-pic"></img>
                        <div className="comment-details">
                            <p className="commenter-name">Henry Luu</p>
                            <p className="comment-content">Tbh Henry Chan shoulda won the oscar instead.</p>
                            <p className="comment-reply"><b>Reply</b> | 5m</p>
                        </div>
                    </div>
                    <EllipsisOutlined />
                </div>
                <div className="write-comment">
                    <input className="comment-input" placeholder="Write a comment"></input>
                </div>
            </div>
        </div>
    );
};

export default Post;