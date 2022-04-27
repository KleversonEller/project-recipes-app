import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title, search }) => {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icone de usuario"
        />
      </Link>
      <h1 data-testid="page-title">
        {title}
      </h1>
      {search && (
        <button
          type="button"
          onClick={ () => setSearchBar(!searchBar) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Icone de busca"
          />
        </button>)}
      {searchBar && (
        <input
          type="text"
          data-testid="search-input"
          placeholder="Type your search"
        />
      )}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.string,
}.isRequired;

export default Header;
