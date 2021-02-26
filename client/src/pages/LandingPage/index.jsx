import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

import facebook from '../../assets/facebook.svg';
import background from '../../assets/formlogin.png';

function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="log-in">
        <Link to="/register">
          <Button className="l-styles">Register Today</Button>
        </Link>
        <Button className="l-styles">
          <img src={facebook} style={{ marginRight: '10px' }} />
          Facebook Login
        </Button>
        <Link to="/login">
          <p>
            Already have an account? <strong>Log in</strong>
          </p>
        </Link>
      </div>
      <img src={background} alt="background" className="background" />
    </div>
  );
}

export default LandingPage;
