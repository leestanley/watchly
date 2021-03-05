import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Form, Input, Modal, Button, Slider, notification } from 'antd';
import AutoCard from '../AutoCard';

import './style.scss';
import fbase from '../../firebase';
import API from '../../API';

const { TextArea } = Input;

const WritePost = ({ updatePosts }) => {
  const [user, loading, error] = useAuthState(fbase.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [rating, setRating] = useState(5);
  const [show, setShow] = useState('');
  const [options, setOptions] = useState([]);
  const [mediaId, setMediaId] = useState('');
  const [selected, setSelected] = useState(null);

  const [form] = Form.useForm();

  if (loading) return <></>;

  const onSelect = (data) => {
    setSelected(data);
    for (let i = 0; i < options.length; i++) {
        if(options[i].value === data) {
            setMediaId(options[i].category)
            break;
        }
    }
  };

  const loadSearchResults = async (show) => {
    try {
      let searchResults = await API.search(show);
      let data = searchResults.data;

      if (data.success) {
        let list = [];
        data.list.forEach((d) => {
          list.push({
            category: d.id,
            value: d.title,
          });
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

  const onSearch = async (searchText) => {
    if (searching) return;
    setSelected(null)
    // setShow('')

    setSearching(true);
    if (searchText.length > 2) {
      let data = await loadSearchResults(searchText);
      setOptions(data);
      console.log(data);
    } else {
      setOptions([]);
    }

    setSearching(false);
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

  const handleCreate = async (values) => {
    values.title = show; // override
    
    let userResult = await API.getInfoFromEmail(user.email);
    let profileData = userResult.data;

    if(selected === null) {
        notification.error({
            message: 'Selection Issue',
            description: "Please hit enter and select from the dropdown"
          });
    }

    if (profileData.success) {
      profileData = profileData.data;
      API.createPost(profileData.username, values.content, mediaId.toString().trim(), values.sliderval + '').then(
        (response) => {
          console.log(response.data);

          if (response.data.success) {
            setIsModalVisible(false);
            updatePosts();
          } else {
            notification.error({
              message: 'Error Creating Post',
              description: response.data.message
            });
          }
        }
      );
    } else {
      notification.error({
        message: 'Error Creating Post',
        description: profileData.message
      });
    }
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
                  selected={selected}
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
              <h2>Write Review</h2>
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
