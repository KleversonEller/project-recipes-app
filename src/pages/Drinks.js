import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/footer.css';

function Drinks() {
  return (
    <div className="drinksContainer">
      <Header title="Drinks" search="true" />
      <Footer />
    </div>
  );
}

export default Drinks;
