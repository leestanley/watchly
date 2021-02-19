import './style.scss';

import SearchCard from '../../components/SearchCard';
import ShowCard from '../../components/ShowCard';
import FriendCard from '../../components/FriendCard';
import Post from '../../components/Post';

function SearchPage() {
  return (
    <div className="SearchPage">
      <SearchCard />
      <ShowCard />
      <FriendCard />
      <h2>Global Reviews</h2>
      <Post />
    </div>
  );
}

export default SearchPage;
