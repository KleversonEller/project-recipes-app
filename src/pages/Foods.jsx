import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/foods.css';

const Foods = () => (
  <div className="foodsContainer">
    <div>
      <Header title="Foods" search="true" />
    </div>
    <Footer />
  </div>
);

export default Foods;
