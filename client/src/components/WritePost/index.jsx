import React, { useState } from 'react';
import { Form, Input, Modal, Button, Slider, InputNumber } from 'antd';
import SearchCard from '../SearchCard';

import './style.scss';

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
        setIsModalVisible(false);
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
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            handleCreate(values);
                        })
                        .catch((info) => {
                            console.log('validate failed:', info);
                        })
                }}
                onCancel={handleCancel}
                footer={[
                    <Button key="Cancel" shape="round" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" shape="round" onClick={handleCreate}>
                        Post
                    </Button>
                ]}
            >
                <div className="Modal">
                    <Form name="post-form" form={form} initialValues={{
                        'slider-val': 5,
                        'number-val': 5
                    }}>
                        <div className="modal-body">
                            <Form.Item name="title">
                                <SearchCard title="TV Show or Movie" />
                            </Form.Item>
                        </div>
                        <div className="modal-rating">
                            <div className="rating-top">
                                <h2>Your Rating</h2>
                                <Form.Item name="slider-val">
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
                            <Form.Item name="number-val">
                                <InputNumber min={0} max={10} value={rating} onChange={handleRating} />
                            </Form.Item>
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