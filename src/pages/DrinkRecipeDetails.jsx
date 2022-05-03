/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonRecipe from '../components/ButtonRecipe';
import { getDrinkRecipeById } from '../services/theCockTailDbAPI';
import { getAllMeals } from '../services/theMealsDbAPI';
import home from '../images/casa.png';
import Favorite from '../components/Favorite';

const DrinkRecipeDetails = () => {
  const { id } = useParams();
  const SIX = 6;
  const SEVENTEEN = 17;
  const THIRD_TWO = 32;
  const FORTY_SEVEN = 47;
  const type = 'drink';
  const [drink, setDrink] = useState();
  const [drinkArray, setDrinkArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [food, setFood] = useState([]);
  // console.log(type);

  const getInfo = async () => {
    getDrinkRecipeById(id).then((data) => {
      setDrink(data);
      setDrinkArray([data]);
      setIngredients(Object.keys(data).slice(SEVENTEEN, THIRD_TWO));
      setMeasure(Object.keys(data).slice(THIRD_TWO, FORTY_SEVEN));
    });
  };

  const getRecommendedDrink = async () => {
    getAllMeals().then((data) => {
      setFood(data.slice(0, SIX));
    });
  };

  useEffect(() => {
    getInfo();
    getRecommendedDrink();
  }, []);

  return (
    <div className="foodRecipeDetailsContainer">
      <Link to="/drinks">
        <img src={ home } alt="Link para home" className="homeLink" />
      </Link>
      { drink && (
        <div className="foodContainerDetails">
          <img
            src={ drink.strDrinkThumb }
            alt={ `${drink.strDrink}` }
            data-testid="recipe-photo"
            className="foodRecipeDetailsImage"
          />
          <div>
            <h2 className="foodsTitle" data-testid="recipe-title">{drink.strDrink}</h2>
            <h4 data-testid="recipe-category">{drink.strAlcoholic}</h4>
          </div>
          <Favorite food={ drink } type={ type } />
          <h4>Ingredients</h4>
          <div>
            {
              drinkArray.map((item) => (
                <section key={ item } className="foodRecipeDetailsIngredients">
                  <div className="foodIngredientsContainer">
                    {
                      ingredients.map((ing, index) => (
                        <p
                          key={ ing }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          {item[`strIngredient${index + 1}`]}
                        </p>
                      ))
                    }
                  </div>
                  <div className="foodMesaureContainer">
                    {
                      measure.map((meas, index) => (
                        <p
                          key={ meas }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          {item[`strMeasure${index + 1}`]}
                        </p>
                      ))
                    }
                  </div>
                </section>
              ))
            }
          </div>
          <h4>Instructions</h4>
          <div data-testid="instructions" className="foodInstructions">
            <p>{ drink.strInstructions }</p>
          </div>
          <h4>Recommended</h4>
          <div className="drinkRecommendedContainer">
            {food && (
              food.map((item, index) => (
                <div
                  key={ index }
                  className="drinkRecommended"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <Link to={ `/foods/${item.idMeal}` }>
                    <img src={ item.strMealThumb } alt={ item.strMeal } />
                    <h3 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h3>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <ButtonRecipe type="drink" />
    </div>
  );
};

DrinkRecipeDetails.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default DrinkRecipeDetails;
