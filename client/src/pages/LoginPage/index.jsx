import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import fbase from '../../firebase';
import './style.scss';

import background from '../../assets/formlogin.png';

function LoginPage({ history }) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const onLogin = () => {
    if (email && email.trim().length > 0) {
      if (password && password.trim().length > 0) {
        fbase.login(email, password, res => {
          alert('Successfully logged in!');
          history.push('/home');
        }, error => alert(error));
      } else {
        alert('Please provide a password!');
      }
    } else {
      alert('Please provide an email!');
    }
  };

  return (
    <div className="LoginPage">
      <div className="log-in">
        <h3>Email</h3>
        <Input className="input" value={email} onChange={(e) => setEmail(e.target.value)}  />
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
        <Button className="l-styles" onClick={onLogin}>Submit</Button>
        <Link to="/">
          <p>Go Back</p>
        </Link>
      </div>
      <img src={background} alt="background" className="background" />
    </div>
  );
}

export default LoginPage;
