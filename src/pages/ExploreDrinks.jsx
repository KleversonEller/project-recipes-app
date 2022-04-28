import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

const ExploreDrinks = () => {
  const navigate = useNavigate();

  const getRandomDrinkId = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const data = await (await fetch(URL)).json();
    const { idDrink } = data.drinks[0];
    navigate(`/drinks/${idDrink}`);
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
          onClick={ getRandomDrinkId }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
