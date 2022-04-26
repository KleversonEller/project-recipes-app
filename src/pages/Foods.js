import React from 'react';
import { Link } from 'react-router-dom';

function Foods() {
  return (
    <div>
      <h1>Foods</h1>
      <Link to="/">
        <button type="button">Login</button>
      </Link>
    </div>
  );
}

export default Foods;
