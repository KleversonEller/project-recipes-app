import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';
import { getSurpriseMeal } from '../services/theMealsDbAPI';

const ExploreFoods = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="Explore Foods" />
      <div className="buttonsContainer">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => navigate('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => navigate('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => getSurpriseMeal()
            .then(({ idMeal }) => navigate(`/foods/${idMeal}`)) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreFoods;
