import React from 'react';
import './SearchBar.css';

const SearchBar = ({ username, onInputChange, onSearch, onKeyDown }) => {
  return (
    <header className="header">
      <h1>Search GitHub Users</h1>
      <p>Enter a username to fetch a user profile and repos</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </header>
  );
};

export default SearchBar; 
