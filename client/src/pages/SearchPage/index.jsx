import './style.scss';

import SearchCard from '../../components/SearchCard';
import ShowCard from '../../components/ShowCard';
import FriendCard from '../../components/FriendCard';
import Post from '../../components/Post';

function SearchPage() {
  return (
    <div className="SearchPage">
      <SearchCard title="Search for a TV Show or Movie" />
      <ShowCard />
      <FriendCard />
      <h2 style={{"marginTop": "2vh"}}>Global Reviews</h2>
      <Post />
      <div style={{height: '75px'}} />
    </div>
  );
}

export default SearchPage;
