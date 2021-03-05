import { Button } from 'antd';
import movieimg from '../../assets/spacejam.jpg';

import './style.scss';

const ShowCard = () => {
  return (
    <div className="show-container">
      <div className="post-body">
        <div className="post-main">
          <img className="post-img" src={movieimg} alt="Title poster"></img>
          <div className="post-content">
            <div className="content-header">
              <div className="content-details">
                <p className="content-title">Space Jam</p>
                <p className="content-date">2018</p>
              </div>
              <div className="show-rating">
                <p className="post-rating">7.2/10</p>
                <p className="sub-rating">global avg.</p>
              </div>
            </div>
            <div className="post-text">
              <p>
                Swackhammer (Danny DeVito), an evil alien theme park owner,
                needs a new attraction at Moron Mountain. When his gang, the
                Nerdlucks, heads to Earth to kidnap Bugs Bunny (Billy West) and
                the Looney Tunes...
              </p>
            </div>
          </div>
        </div>
        <div className="post-tags">
          <Button className="addlist" shape="round" size="medium">
            Add to List >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
