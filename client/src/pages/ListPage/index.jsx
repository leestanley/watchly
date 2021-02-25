import SearchCard from '../../components/SearchCard';
import List from '../../components/List';
import './style.scss';

// remove later
import spacejam from '../../assets/spacejam.jpg';

const ListPage = () => {
    // remove later
    const list = [
        {
            title: 'Space Jam',
            date: '2018',
            img: spacejam,
            ranking: 1,
            rating: 9.4
        },
        {
            title: 'iCarly',
            date: '2007-2018',
            img: spacejam,
            ranking: 2,
            rating: 9.2
        },
        {
            title: 'Avengers',
            date: '2012',
            img: spacejam,
            ranking: 3,
            rating: 8.9
        },
        {
            title: 'Man of Steel',
            date: '2013',
            img: spacejam,
            ranking: 4,
            rating: 8.5
        }
    ];

    return (
        <div className="ListPage">
            <SearchCard title="Your TV Shows and Movies" />
            <List list={list} />
        </div>
    );
}

export default ListPage;