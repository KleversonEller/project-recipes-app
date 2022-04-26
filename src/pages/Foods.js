import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Foods() {
  return (
    <div>
      <Header title="Foods" search="true" />
      <Link to="/">
        <button type="button">Login</button>
      </Link>
    </div>
  );
}

export default Foods;
