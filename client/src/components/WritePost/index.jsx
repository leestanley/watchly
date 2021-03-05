import React, { useState } from 'react';
import { Form, Input, Modal, Button, Slider, notification } from 'antd';
import AutoCard from '../AutoCard';

import './style.scss';
import fbase from '../../firebase';
import API from '../../API';

const { TextArea } = Input;

const WritePost = ({ updatePosts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [rating, setRating] = useState(5);
  const [show, setShow] = useState('');
  const [options, setOptions] = useState(['meow', 'meow']);
  const [id, setId] = useState('');

  const [form] = Form.useForm();

  const onSearch = async (searchText) => {
    console.log('active');
    if (searchText.length > 2) {
      let data = await loadSearchResults(searchText);
      console.log(data);
      //   let options = [];
      //   for(let i = 0; i < data.length; i++) {
      //       options.push(data[i].title)
      //   }
    //   setOptions();
    } else {
      setOptions([]);
    }
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const loadSearchResults = async (show) => {
    try {
      let searchResults = await API.search(show);
      let data = searchResults.data;

      if (data.success) {
        let list = [];
        data.list.forEach((d) => {
          list.push(d.title);
        });
        return list;
      } else {
        notification.error({
          message: 'Error',
          description: data.message,
        });
      }
    } catch (e) {
      notification.error({
        message: 'Error',
        description: e.message,
      });
    }
  };

  const marks = {
    0: '0',
    10: {
      style: {
        color: '#000',
      },
      label: '10',
    },
  };

  const showChange = (data) => {
    setShow(data);
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
    let user = 'testtesttest';
    let id = '372058';
    API.createPost(user, values.content, id, values.sliderval + '').then(
      (response) => {
        setIsModalVisible(false);
        updatePosts();
      }
    );
  };

  return (
    <div className="write-post-container">
      <h2 className="write-post-header">Write a post</h2>
      <Button
        className="post-button"
        shape="round"
        size="medium"
        type="primary"
        onClick={showModal}
      >
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
              handleCreate(values);
            })
            .catch((info) => {
              console.log('validate failed:', info);
            });
        }}
        onCancel={handleCancel}
      >
        <div className="Modal">
          <Form
            name="post-form"
            form={form}
            initialValues={{
              sliderval: 5,
            }}
          >
            <div className="modal-body">
              <Form.Item name="title">
                <AutoCard
                  title="TV Show or Movie"
                  options={options}
                  show={show}
                  onChange={showChange}
                  onSearch={onSearch}
                  onSelect={onSelect}
                />
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
                    style={{ width: 305 }}
                    value={rating}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="modal-input">
              <Form.Item name="content">
                <h2>Write Review</h2>
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
