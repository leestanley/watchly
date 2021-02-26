import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { Form, Input, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import pfp from '../../assets/tmpprofilepic.jpg';
import './style.scss';

const CommentSection = ({ commentList }) => {
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

    const [comments, setComments] = useState(commentList);

    useEffect(() => {
        setComments(commentList);
    }, [commentList]);

    const renderComments = () => {
        return comments.map((comment) => {
            return (
                <Comment key={comment.uuid} comment={comment} />
            );
        });
    };

    const handleCreateComment = (values) => {
        setComments(comments => [...comments, {
            uuid: 3,
            profile: {
                pfp: pfp,
                name: 'Stanley Lee'
            },
            content: values.comment,
            replies: []
        }]);
        // console.log(commentList);
    }

    // add check for empty comment later on, disable form submit if empty
    return (
        <div className="CommentSection">
            <div className="comment-list">
                {renderComments()}
            </div>
            <Form onFinish={handleCreateComment} className="comment-form">
                <Form.Item className="form-item" name="comment">
                    <Input placeholder="Write a comment..." style={{ width: 280 }} />
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