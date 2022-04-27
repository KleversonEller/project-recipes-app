import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import '../css/foods.css';

const Foods = () => (
  <div className="foodsContainer">
    <div>
      <Header title="Foods" search="true" />
      <Cards page="food" />
      <Link to="/">
        <button type="button">Login</button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Foods;
