import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { Form, Input, Button, notification } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import fbase from '../../firebase';
import API from '../../API';
import './style.scss';

const CommentSection = ({ commentList, postID, updateComments }) => {
    const [user, loading, error] = useAuthState(fbase.auth);
    const [comments, setComments] = useState(commentList);
    const [currentComment, setCurrentComment] = useState('');

    useEffect(() => {
        setComments(commentList);
    }, [commentList]);

    if (loading) return <></>;
    
    /*
    const [comments, setComments] = useState([{ uuid: "loading", author: "Loading", time: Date.now(), content: "Loading", childList: [], score: 0 }]);

    useEffect(() => {
        API.getComments(postId)
            .then(response => {
                setComments(response.data)
            })
            .catch(error => {

            })
    }, [newComment, refreshComments])
    */

    const renderComments = () => {
        return comments.map((comment) => {
            return (
                <Comment key={comment.comment_id} comment={comment} commentID={comment.comment_id} postID={postID} updateReplies={updateComments} />
            );
        });
    };

    const handleCreateComment = async (values) => {
        let userResult = await API.getInfoFromEmail(user.email);
        let profileData = userResult.data;

        if (profileData.success) {
            profileData = profileData.data;
            API.createComment(profileData.username, values.comment, postID).then(response => {
                setCurrentComment(''); // clear field
                updateComments();
            });
        } else {
            notification.error({
                message: 'Error posting comment',
                description: profileData.message
            });
        }
    }

    // add check for empty comment later on, disable form submit if empty
    return (
        <div className="CommentSection">
            <div className="comment-list">
                {renderComments()}
            </div>
            <Form onFinish={handleCreateComment} className="comment-form">
                <Form.Item className="form-item" name="comment">
                    <Input onChange={e => setCurrentComment(e.target.value)} value={currentComment} placeholder="Write a comment..." style={{ width: 280 }} autocomplete="off" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">
                        <MessageOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CommentSection;