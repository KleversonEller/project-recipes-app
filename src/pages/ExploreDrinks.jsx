import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

const ExploreDrinks = () => {
  const navigate = useNavigate();

  const getIdDrink = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(URL);
    const data = await response.json();
    const idSurpriseDrink = data.drinks[0].idDrink;
    navigate(`/drinks/${idSurpriseDrink}`);
  };

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
          onClick={ getIdDrink }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
