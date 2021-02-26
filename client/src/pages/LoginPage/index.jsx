import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import fbase from '../../firebase';
import './style.scss';

import background from '../../assets/formlogin.png';

function LoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (email && email.trim().length > 0) {
      if (password && password.trim().length > 0) {
        fbase.login(
          email,
          password,
          (res) => {
            notification.success({
              message: 'Success!',
              description: 'Search for shows and movies now!',
            });
            history.push('/home');
          },
          (error) => alert(error)
        );
      } else {
        notification.error({
          message: 'Auth Error',
          description: 'Please provide a password!',
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
    <div className="LoginPage">
      <form>
        <div className="log-in">
          <Link to="/home">
            <p>
              For demo purposes click here to skip or use <br /> "test@test.com
              : 123test"
            </p>
          </Link>
          <h3>Email</h3>
          <Input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button className="l-styles" onClick={onLogin} type="submit">
            Submit
          </Button>
          <Link to="/">
            <p>Go Back</p>
          </Link>
        </div>
      </form>
      <img src={background} alt="background" className="background" />
    </div>
  );
}

export default LoginPage;
