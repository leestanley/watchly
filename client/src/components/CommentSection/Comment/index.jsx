import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Menu, Dropdown, notification } from 'antd';
import { Link } from 'react-router-dom';
import { MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useAuthState } from 'react-firebase-hooks/auth';

import fbase from '../../../firebase';
import API from '../../../API';
import './style.scss';

const Comment = ({ comment, commentID, postID, updateReplies }) => {
    const [user, loading, error] = useAuthState(fbase.auth);
    const [newReply, setNewReply] = useState(false);
    const [replies, setReplies] = useState(comment.replies);

    const [selfUsername, setSelfUsername] = useState('');
    const [loadingData, setLoadingData] = useState(true);
    const [commentMenu, setCommentMenu] = useState(null);

    useEffect(() => {
        setReplies(comment.replies);
    }, [comment.replies]);

    const loadUsername = async () => {
        setLoadingData(true);
        let userResult = await API.getInfoFromEmail(user.email);
        let profileData = userResult.data;
    
        if (profileData.success) {
          profileData = profileData.data;
          setSelfUsername(profileData.username);
    
          if (comment.username === profileData.username) {
            // it's the user!
            let commentMenuItems = (
                <Menu onClick={handleCommentMenu}>
                    <Menu.Item danger key="delete">
                        Delete Comment
                    </Menu.Item>
                </Menu>
            );

            setCommentMenu(
                <Dropdown overlay={commentMenuItems}>
                    <EllipsisOutlined className="comment-more-icon" />
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

    if (loading) return <></>;

    const openReply = (e) => {
        e.preventDefault();
        setNewReply(true);
    };

    const createReply = async (values) => {
        let userResult = await API.getInfoFromEmail(user.email);
        let profileData = userResult.data;

        if (profileData.success) {
            profileData = profileData.data;
            API.createReply(profileData.username, values.reply, postID, commentID).then(response => {
                setNewReply(false);
                updateReplies();
            });
        } else {
            notification.error({
                message: 'Error posting comment',
                description: profileData.message
            });
        }
    };

    // later add check for empty reply
    const renderReplyEditor = () => {
        if (newReply) {
            return (
                <div className="reply-editor">
                    <Form onFinish={createReply} className="reply-form">
                        <Form.Item name="reply">
                            <Input autocomplete="off" placeholder="Write a reply..." style={{ width: 237 }} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">
                                <MessageOutlined />
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
    };

    const handleCommentMenu = ({ key }) => {
        // check if equal to delete
        // make api call
        if (key === 'delete') {
            API.deleteComment(postID, commentID).then(response => {
                updateReplies();
            });
        }
    };

    const handleReplyMenu = (key, replyID) => {
        // check if equal to delete
        // make API call
        if (key.key === 'delete') {
            API.deleteReply(postID, commentID, replyID).then(response => {
                updateReplies();
            });
        }
    };

    const renderReplies = () => {
        if (loadingData) return <></>;

        return replies.map((reply) => {
            let replyMenu = null;
            if (reply.user_info.username === selfUsername) {
                let replyMenuItems = (
                    <Menu onClick={(key) => {
                        handleReplyMenu(key, reply.comment_id);
                    }}>
                        <Menu.Item danger key="delete">
                            Delete Reply
                        </Menu.Item>
                    </Menu>
                );
    
                replyMenu = (
                    <Dropdown overlay={replyMenuItems}>
                        <EllipsisOutlined className="comment-more-icon" />
                    </Dropdown>
                );
            }

            return (
                <div className="Reply" key={reply.comment_id}>
                    <div className="comment-info">
                        {loadingData ? <img className="commenter-pic" src={reply.user_info.profilePicture} alt="Profile"></img> : <>
                            <Link to={(reply.user_info.username === selfUsername) ? '/profile' : `/profile/${reply.user_info.username}`}>
                                <img className="commenter-pic" src={reply.user_info.profilePicture} alt="Profile"></img>
                            </Link>
                        </>}
                        <div className="comment-details">
                            <Link to={(reply.user_info.username === selfUsername) ? '/profile' : `/profile/${reply.user_info.username}`}>
                                <p className="commenter-name">{reply.user_info.username}</p>
                            </Link>
                            
                            <p className="comment-content">{reply.content}</p>
                            <p className="comment-reply"><a className="bold-reply" onClick={openReply} href="/#">Reply</a></p>
                        </div>
                    </div>
                    {!loadingData && replyMenu}
                </div>
            );
        });
    }

    return (
        <div className="Comment">
            <div className="main-comment">
                <div className="comment-info">
                    {loadingData ? <img className="commenter-pic" src={comment.user_info.profilePicture} alt="Profile"></img> : <>
                        <Link to={(comment.user_info.username === selfUsername) ? '/profile' : `/profile/${comment.user_info.username}`}>
                            <img className="commenter-pic" src={comment.user_info.profilePicture} alt="Profile"></img>
                        </Link>
                    </>}
                    <div className="comment-details">
                        <p className="commenter-name">{comment.user_info.username}</p>
                        <p className="comment-content">{comment.content}</p>
                        <p className="comment-reply"><a className="bold-reply" onClick={openReply} href="/#">Reply</a></p>
                    </div>
                </div>
                {!loadingData && commentMenu}
            </div>
            {renderReplies()}
            {renderReplyEditor()}
    </div>
    );
};

export default Comment;