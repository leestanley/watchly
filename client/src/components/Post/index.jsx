import { Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import CommentSection from '../CommentSection';
import pfp from '../../assets/tmpprofilepic.jpg';
import movieimg from '../../assets/spacejam.jpg';

import './style.scss';

const Post = () => {
    // remove later
    const commentList = [
        {
            uuid: 1,
            profile: {
                pfp: pfp,
                name: 'Alan Cao'
            },
            content: 'Completely disagree, msg me on DM we can fite.',
            replies: []
        },
        {
            uuid: 2,
            profile: {
                pfp: pfp,
                name: 'Henry Luu'
            },
            content: 'Tbh Henry Chan shoulda won the oscar instead.',
            replies: []
        },
    ];

    return(
        <div className="post-container">
            <div className="post-header">
                <div className="poster-info">
                    <img className="poster-pic" src={pfp} alt="Profile"></img>
                    <div className="poster-details">
                        <p className="poster-name">Jeffrey Ha</p>
                        <p className="post-time">Posted 10m ago</p>
                    </div>
                </div>
                <EllipsisOutlined className="more-icon"/>
            </div>
            <div className="post-body">
                <div className="post-main">
                    <img className="post-img" src={movieimg} alt="Title poster"></img>
                    <div className="post-content">
                        <div className="content-header">
                            <div className="content-details">
                                <p className="content-title">Space Jam</p>
                                <p className="content-date">2018</p>
                            </div>
                            <p className="post-rating">7.2/10</p>
                        </div>
                        <div className="post-text">
                            <p>I really liked how Henry Chan dunked on Danny Nguyen in this one. Like who would have expected that
                        omega fire 2 pointer on that poggers jump. Overall, good movie, I would recommend it to friends who love volleyball and cooking.<br /><br /><b>Animation:</b> 9/10<br /><b>Story:</b> 8/10<br /><b>Acting:</b> 4/10</p>
                        </div>
                    </div>
                </div>
                <div className="post-tags">
                    <Button shape="round" size="small">Horror</Button>
                    <Button shape="round" size="small">Sci-Fi</Button>
                </div>
            </div>
            <CommentSection commentList={commentList} />
        </div>
    );
};

export default Post;