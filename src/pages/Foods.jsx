import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/foods.css';

const Foods = () => (
  <div className="foodsContainer">
    <div>
      <Header title="Foods" search="true" />
      <Link to="/">
        <button type="button">Login</button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Foods;
