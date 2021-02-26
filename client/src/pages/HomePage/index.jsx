import Post from '../../components/Post';
import WritePost from '../../components/WritePost';

const HomePage = () => {
    return (
        <div className="HomePage">
            <WritePost />
            <Post />
            <div style={{height: '75px'}} />
         </div>
    );
}

export default HomePage;