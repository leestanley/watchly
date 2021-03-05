import './style.scss';

import { Input } from 'antd';

const { Search } = Input;

function SearchCard({ title, onSubmit }) {
  const onSearch = (value) => {
    if (onSubmit)
      onSubmit(value);
  };

  return (
    <div className="SearchCard">
      <h2 className="title">{title}</h2>
      {/* eslint-disable-next-line no-restricted-globals */}
      <Search placeholder="Search here" onSearch={onSearch} enterButton />
    </div>
  );
}

export default SearchCard;
