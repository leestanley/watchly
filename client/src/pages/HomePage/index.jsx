import Post from '../../components/Post';
import WritePost from '../../components/WritePost';

const HomePage = () => {
    return (
        <div className="HomePage">
            <WritePost />
            <Post />
        </div>
    );
}

export default HomePage;