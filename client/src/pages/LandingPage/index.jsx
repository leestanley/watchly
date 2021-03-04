import { Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { encode } from 'js-base64';
import ax from 'axios';

import fbase from '../../firebase';
import './style.scss';

import facebook from '../../assets/facebook.svg';
import background from '../../assets/formlogin.png';

const BASE_API = process.env.REACT_APP_API_URL;
function LandingPage({ history }) {
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

  if (user) {
    // logged in already
    history.push('/home');

    // we have to return something so we'll return an empty page.
    return <div></div>;
  }

  const onFacebookLogin = () => {
    fbase.auth.signInWithPopup(fbase.fb).then(result => {
      // need to check if this email has an account associated already
      
      ax.get(`${BASE_API}/users/emailRegistered?email=${result.user.email}`).then(res => {
        if (res.data.success)
          history.push('/home');
        else
          history.push(`/fbRegister?email=${encode(result.user.email)}&profilePic=${encode(result.user.photoURL)}`);
      }).catch(error => notification.error({
        message: 'Auth Error',
        description: error.message,
      }));
    }).catch(error => notification.error({
      message: 'Auth Error',
      description: error.message,
    }));
  };

  return (
    <div className="LandingPage">
      <div className="log-in">
        <Link to="/register">
          <Button className="l-styles">Register Today</Button>
        </Link>
        <Button className="l-styles" onClick={onFacebookLogin}>
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