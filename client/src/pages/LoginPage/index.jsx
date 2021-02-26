import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './style.scss';

import background from '../../assets/formlogin.png';

function LoginPage() {
  return (
    <div className="LoginPage">
      <div className="log-in">
        <h3>Email or Username</h3>
        <Input className="input" />
        <h3>Password</h3>
        <Input.Password
          className="input"
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone />
            ) : (
              <EyeInvisibleOutlined style={{ color: 'white' }} />
            )
          }
        />
        <Link to="/home">
          <Button className="l-styles">Submit</Button>
        </Link>
        <Link to="/">
          <p>Go Back</p>
        </Link>
      </div>
      <img src={background} alt="background" className="background" />
    </div>
  );
}

export default LoginPage;
