import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import '../css/footer.css';
import '../css/drinks.css';

const Drinks = () => (
  <div className="drinksContainer">
    <div>
      <Header title="Drinks" search="true" />
    </div>
    <div className="foodsCardsContainer">
      <Cards page="drinks" />
    </div>
    <div className="foodsFooterContainer">
      <Footer />
    </div>
  </div>
);

export default Drinks;
