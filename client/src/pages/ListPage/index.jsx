import SearchCard from '../../components/SearchCard';
import List from '../../components/List';
import './style.scss';
import movieJSON from '../../assets/movies.json';

const ListPage = () => {
    return (
        <div className="ListPage">
            <SearchCard title="Your TV Shows and Movies" />
            <List list={movieJSON.movies} />
        </div>
    );
}

export default ListPage;