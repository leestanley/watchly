import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import ax from 'axios';
import { decode } from 'js-base64';
import './style.scss';

import background from '../../assets/formlogin.png';

const BASE_API = process.env.REACT_APP_API_URL;
function FacebookRegisterPage({ history }) {
  const [username, setUsername] = useState('');

  let search = window.location.search;
  let params = new URLSearchParams(search);

  if (!params.has('email') || params.get('email').trim().length === 0) {
    history.push('/');

    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    );
  }

  if (!params.has('profilePic') || params.get('profilePic').trim().length === 0) {
    history.push('/');

    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    );
  }

  let email = null;
  let profilePic = null;

  // decode base64
  try {
    email = decode(params.get('email'));
    profilePic = decode(params.get('profilePic'));
  } catch (e) {
    history.push('/');

    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    );
  }

  const onRegister = () => {
    if (username && username.trim().length > 0) {
      ax.post(`${BASE_API}/users/createUser`, {
        username,
        email,
        profilePic,
      })
        .then((res) => {
          if (res.data.success) {
            notification.open({
              message: 'Successfully created an account through Facebook!',
            });

            history.push('/home');
          } else {
            notification.error({
              message: 'Auth Error',
              description: res.data.message
            });
          }
        })
        .catch((error) => notification.error({
          message: 'Auth Error',
          description: error.message
        }));
    } else {
      notification.error({
        message: 'Auth Error',
        description: 'Please provide an email!',
      });
    }
  };

  return (
    <div className="FacebookRegisterPage">
      <div className="sign-up">
        <h3>
          Complete your registration by completing the field below!
        </h3>
        <br />
        <h3>Username</h3>
        <Input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button className="l-styles" onClick={onRegister}>
          Submit
        </Button>
        <Link to="/">
          <p>Go Back</p>
        </Link>
      </div>
      <img src={background} alt="background" className="background" />
    </div>
  );
}

export default FacebookRegisterPage;