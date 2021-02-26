import Post from '../../components/Post';
import WritePost from '../../components/WritePost';
import postJSON from '../../assets/posts.json';

const HomePage = () => {
    const renderPosts = () => {
        return postJSON.posts.map((post) => {
            return (
                <Post post={post} />
            )
        });
    };

    return (
        <div className="HomePage">
            <WritePost />
            {renderPosts()}
        </div>
    );
}

export default HomePage;