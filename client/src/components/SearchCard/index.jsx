import './style.scss';

import { Input } from 'antd';

const { Search } = Input;

function SearchCard() {
  const onSearch = value => console.log(value);

  return (
    <div className="SearchCard">
      <h2 className="title">Search for a TV Show or Movie</h2>
      <Search placeholder="Search here" onSearch={onSearch} enterButton />
    </div>
  );
}

export default SearchCard;
