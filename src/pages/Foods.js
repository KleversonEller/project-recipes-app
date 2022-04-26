import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div className="foodsContainer">
      <h1>Foods</h1>
      <Link to="/">
        <button type="button">Login</button>
      </Link>
      <Footer />
    </div>
  );
}

export default Foods;
