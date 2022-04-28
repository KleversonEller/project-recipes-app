import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { fetchRandomMeal } from '../services/theMealsDbAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

const ExploreFoods = () => {
  const navigate = useNavigate();

  const getId = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(URL);
    const data = await response.json();
    const idSurpriseMeal = data.meals[0].idMeal;
    navigate(`/foods/${idSurpriseMeal}`);
  };

  /*
  const getIdFood = async () => {
    const id = await fetchRandomMeal();
    const idSurpriseMeal = id.idMeal;
    console.log(idSurpriseMeal);
    navigate(`/foods/${idSurpriseMeal}`);
  };
*/
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
          onClick={ getId }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreFoods;
