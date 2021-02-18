import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import WritePost from '../../components/WritePost';

const HomePage = () => {
    return (
        <div className="HomePage">
            <Title />
            <WritePost />
            <Post />
            <Navbar />
        </div>
    );
}

export default HomePage;