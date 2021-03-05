import React, { useState } from 'react';
import { Form, Input, Modal, Button, Slider, InputNumber } from 'antd';
import SearchCard from '../SearchCard';

import './style.scss';
import API from '../../API';

const { TextArea } = Input;

const WritePost = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rating, setRating] = useState(5);

    const [form] = Form.useForm();

    const marks = {
        0: '0',
        10: {
            style: {
                color: '#000'
            },
            label: '10'
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleRating = (value) => {
        setRating(value);
    };

    const handleCreate = (values) => {
        // add api call
        console.log(values);
        let user = 'testtesttest';
        let id = '372058';
        API.createPost(user, values.content, id, values.sliderval + '').then((response) => {
            setIsModalVisible(false);
        })
    };

    return (
        <div className="write-post-container">
            <h2 className="write-post-header">Write a post</h2>
            <Button className="post-button" shape="round" size="medium" type="primary" onClick={showModal}>
                Create
            </Button>
            <Modal
                title="Write a post"
                visible={isModalVisible}
                okText="Create"
                cancelText="Cancel"
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            console.log(values);
                            handleCreate(values);
                        })
                        .catch((info) => {
                            console.log('validate failed:', info);
                        })
                }}
                onCancel={handleCancel}
            >
                <div className="Modal">
                    <Form name="post-form" form={form} initialValues={{
                        sliderval: 5,
                    }}>
                        <div className="modal-body">
                            <Form.Item name="title">
                                <SearchCard title="TV Show or Movie" />
                            </Form.Item>
                        </div>
                        <div className="modal-rating">
                            <div className="rating-top">
                                <h2>Your Rating</h2>
                                <Form.Item name="sliderval">
                                    <Slider
                                        min={0}
                                        max={10}
                                        marks={marks}
                                        onChange={handleRating}
                                        style={{ width: 330 }}
                                        value={rating}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="modal-input">
                            <Form.Item name="content">
                                <TextArea rows={4} />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default WritePost;