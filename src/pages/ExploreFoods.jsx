import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

const ExploreFoods = () => {
  const navigate = useNavigate();

  const getRandomFoodId = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const data = await (await fetch(URL)).json();
    const { idMeal } = data.meals[0];
    navigate(`/foods/${idMeal}`);
  };

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
          onClick={ getRandomFoodId }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreFoods;
