import './style.scss';

import SearchCard from '../../components/SearchCard';
import ShowCard from '../../components/ShowCard';
import FriendCard from '../../components/FriendCard';
import Post from '../../components/Post';
import postJSON from '../../assets/posts.json';

function SearchPage() {
  const renderPosts = () => {
    return postJSON.posts.map((post) => {
      return (
        <Post post={post} />
      )
    });
  };

  return (
    <div className="SearchPage">
      <SearchCard title="Search for a TV Show or Movie" />
      <ShowCard />
      <FriendCard />
      <h2 style={{"marginTop": "2vh"}}>Global Reviews</h2>
      {renderPosts()}
    </div>
  );
}

export default SearchPage;
