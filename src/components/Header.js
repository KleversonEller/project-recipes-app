import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';

const Header = ({ title, search }) => {
  console.log(search);
  return (
    <div>
      <Link
        data-testid="profile-top-btn"
        to="/profile"
      >
        <AiOutlineUser />
      </Link>
      <h1 data-testid="page-title">
        {title}
      </h1>
      {search && (
        <button
          type="button"
          data-testid="search-top-btn"
        >
          <AiOutlineSearch />
        </button>)}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.string,
}.isRequired;

export default Header;
