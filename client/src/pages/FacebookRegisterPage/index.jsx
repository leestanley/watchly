import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import ax from 'axios';
import fbase from '../../firebase';
import './style.scss';

import background from '../../assets/formlogin.png';

const BASE_API = process.env.REACT_APP_API_URL;
function FacebookRegisterPage({ history }) {
  const [ username, setUsername ] = useState('');

  let search = window.location.search;
  let params = new URLSearchParams(search);

  if (!params.has('email')) {
    history.push('/');
    return (<div>
      <h3>Redirecting...</h3>
    </div>)
  }
  
  const email = params.get('email');
  const onRegister = () => {
    if (username && username.trim().length > 0) {
      ax.post(`${BASE_API}/users/createUser`, {
          username,
          email
      }).then((res) => {
          if (res.data.success) {
            alert('Successfully created an account through Facebook!');
            history.push('/home');
          } else {
            alert(res.data.message);
          }
      }).catch(err => alert(err));
    } else {
      alert('Please provide an username!');
    }
  };

  return (
    <div className="FacebookRegisterPage">
      <div className="sign-up">
        <h3>Complete your Facebook registration by completing the field below!</h3>
        <br />
        <h3>Username</h3>
        <Input className="input" value={username} onChange={(e) => setUsername(e.target.value)}  />
        <Button className="l-styles" onClick={onRegister}>Submit</Button>
        <Link to="/">
          <p>Go Back</p>
        </Link>
      </div>
      <img src={background} alt="background" className="background" />
    </div>
  );
}

export default FacebookRegisterPage;
