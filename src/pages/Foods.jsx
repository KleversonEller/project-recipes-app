import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import '../css/foods.css';

const Foods = () => (
  <div className="foodsContainer">
    <div>
      <Header title="Meal" search />
    </div>
    <Cards page="Meal" />
    <Footer />
  </div>
);

export default Foods;
