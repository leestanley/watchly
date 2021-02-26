import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import pfp from '../../../assets/tmpprofilepic.jpg';
import './style.scss';

const Comment = ({ comment }) => {
    const [newReply, setNewReply] = useState(false);

    const [replies, setReplies] = useState(comment.replies);

    useEffect(() => {
        setReplies(comment.replies);
    }, [comment.replies]);

    const openReply = (e) => {
        e.preventDefault();
        setNewReply(true);
    };

    const createReply = (values) => {
        setReplies(replies => [...replies, {
            uuid: 4,
            profile: {
                pfp: pfp,
                name: 'Scott Klemmer'
            },
            content: values.reply
        }]);
    };

    // later add check for empty reply
    const renderReplyEditor = () => {
        if (newReply) {
            return (
                <div className="reply-editor">
                    <Form onFinish={createReply} className="reply-form">
                        <Form.Item name="reply">
                            <Input placeholder="Write a reply..." style={{ width: 237,}} />
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

    const renderReplies = () => {
        return replies.map((reply) => {
            return (
                <div className="Reply" key={reply.uuid}>
                    <div className="comment-info">
                        <img className="commenter-pic" src={reply.profile.pfp} alt="Profile"></img>
                        <div className="comment-details">
                            <p className="commenter-name">{reply.profile.name}</p>
                            <p className="comment-content">{reply.content}</p>
                            <p className="comment-reply"><a className="bold-reply" onClick={openReply} href="/#">Reply</a></p>
                        </div>
                    </div>
                    <EllipsisOutlined className="comment-more-icon" />
                </div>
            );
        });
    }

    return (
        <div className="Comment">
            <div className="main-comment">
                <div className="comment-info">
                    <img className="commenter-pic" src={comment.profile.pfp} alt="Profile"></img>
                    <div className="comment-details">
                        <p className="commenter-name">{comment.profile.name}</p>
                        <p className="comment-content">{comment.content}</p>
                        <p className="comment-reply"><a className="bold-reply" onClick={openReply} href="/#">Reply</a></p>
                    </div>
                </div>
                {/* <EllipsisOutlined className="comment-more-icon" /> */}
            </div>
            {renderReplies()}
            {renderReplyEditor()}
    </div>
    );
};

export default Comment;