import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import fbase from '../../firebase';
import './style.scss';

import background from '../../assets/formlogin.png';

function RegisterPage({ history }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegister = () => {
    if (email && email.trim().length > 0) {
      if (username && username.trim().length > 0) {
        if (password && password.trim().length > 0) {
          if (confirmPassword && confirmPassword.length > 0) {
            if (password === confirmPassword) {
              fbase.register(
                username,
                email,
                password,
                (res) => {
                  if (res.data.success) {
                    notification.success({
                      message: 'Success!',
                      description: 'Search for shows and movies now!',
                    });
                    history.push('/');
                  } else {
                    alert(res.data.message);
                  }
                },
                (error) => alert(error)
              );
            } else {
              notification.error({
                message: 'Auth Error',
                description:
                  'Please correctly confirm your password, it should be the same!',
              });
            }
          } else {
            notification.error({
              message: 'Auth Error',
              description: 'Please confirm your password.',
            });
          }
        } else {
          notification.error({
            message: 'Auth Error',
            description: 'Please provide a password.',
          });
        }
      } else {
        notification.error({
          message: 'Auth Error',
          description: 'Please provide a valid username.',
        });
      }
    } else {
      notification.error({
        message: 'Auth Error',
        description: 'Please provide an email!',
      });
    }
  };

  return (
    <div className="RegisterPage">
      <div className="log-in">
        <h3>Email</h3>
        <Input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3>Username</h3>
        <Input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h3>Password</h3>
        <Input.Password
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone />
            ) : (
              <EyeInvisibleOutlined style={{ color: 'white' }} />
            )
          }
        />
        <h3>Confirm Password</h3>
        <Input.Password
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone />
            ) : (
              <EyeInvisibleOutlined style={{ color: 'white' }} />
            )
          }
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

export default RegisterPage;
