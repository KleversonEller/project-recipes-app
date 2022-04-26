import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Foods() {
  return (
    <div className="foodsContainer">
      <Header title="Foods" search="true" />
      <Link to="/">
        <button type="button">Login</button>
      </Link>
      <Footer />
    </div>
  );
}

export default Foods;
