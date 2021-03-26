import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { debounce } from 'lodash';

import './input.css';

const Search = ({ onSearchAdded, searchText }) => {
  const onSearchChange = debounce((event) => {
    const text = event.target.value;

    onSearchAdded(text);
  }, 1500);

  return (
    <div className="input">
      <Input
        allowClear="true"
        defaultValue={searchText}
        onChange={onSearchChange}
        placeholder="Type to search..."
        type="search"
      />
    </div>
  );
};

Search.propTypes = {
  onSearchAdded: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
};

export default Search;
