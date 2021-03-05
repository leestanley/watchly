import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import ax from 'axios';
import { decode } from 'js-base64';

import fbase from '../../firebase';
import './style.scss';

import background from '../../assets/formlogin.png';

const BASE_API = process.env.REACT_APP_API_URL;
function FacebookRegisterPage({ history }) {
  const [username, setUsername] = useState('');
  const [registering, setRegistering] = useState(false);
  const [user, loading, error] = useAuthState(fbase.auth);

  if (loading) {
    // can replace?
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    // can replace?
    return (
      <div>
        <p>
          Error: <b>{error}</b>
        </p>
      </div>
    );
  }

  if (!user) {
    // user is not logged in already
    history.push('/');

    // we have to return something so we'll return an empty page.
    return <div></div>;
  }

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
    if (registering) return;

    setRegistering(true);
    if (username && username.trim().length > 0) {
      ax.post(`${BASE_API}/users/createUser`, {
        username,
        email,
        profilePic,
      })
        .then((res) => {
          setRegistering(false);
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
        .catch((error) => {
          setRegistering(false);
          notification.error({
            message: 'Auth Error',
            description: error.message
          })
        });
    } else {
      setRegistering(false);
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
          {registering ? "Registering account..." : "Complete your registration by completing the field below!"}
        </h3>
        <br />
        <h3>Username</h3>
          <Input
            className="input"
            value={username}
            disabled={registering}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button disabled={registering} className="l-styles" onClick={onRegister}>
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