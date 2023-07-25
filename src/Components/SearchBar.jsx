import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="input-group rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <span className="input-group-text border-0" id="search-addon">
        <i className="zmdi zmdi-search"></i>
      </span>
    </div>
  );
};

export default SearchBar;
