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
    <div className="foodsCardsContainer">
      <Cards page="Meal" />
    </div>
    <div className="foodsFooterContainer">
      <Footer />
    </div>
  </div>
);

export default Foods;
