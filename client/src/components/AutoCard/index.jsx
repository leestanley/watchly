import './style.scss';

import { Input, AutoComplete } from 'antd';

function AutoCard(props) {
  return (
    <div className="AutoCard">
      <h2 className="title">{props.title}</h2>
      {/* eslint-disable-next-line no-restricted-globals */}
      <AutoComplete
        size="large"
        style={{ width: '100%' }}
        className="global-search"
        options={props.options}
        value={props.show}
        onChange={props.onChange}
        onSearch={props.onSearch}
        onSelect={props.onSelect}
      >
        <Input.Search size="large" placeholder="input here" enterButton />
      </AutoComplete>
    </div>
  );
}

export default AutoCard;
