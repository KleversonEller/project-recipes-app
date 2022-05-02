import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';
import { getSurpriseDrink } from '../services/theCockTailDbAPI';

const ExploreDrinks = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="Explore Drinks" />
      <div className="buttonsContainer">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => navigate('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => getSurpriseDrink()
            .then(({ idDrink }) => navigate(`/drinks/${idDrink}`)) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
