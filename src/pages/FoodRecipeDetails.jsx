/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonRecipe from '../components/ButtonRecipe';
import { getMealRecipeById } from '../services/theMealsDbAPI';
import { getAllDrinks } from '../services/theCockTailDbAPI';
import home from '../images/casa.png';
import Favorite from '../components/Favorite';

const FoodRecipeDetails = () => {
  const { id } = useParams();
  const SIX = 6;
  const NINE = 9;
  const TWENTY_NINE = 29;
  const FORTY_EIGHT = 48;
  const [food, setFood] = useState();
  const [foodArray, setFoodArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [drink, setDrink] = useState([]);
  const [youtube, setYoutube] = useState();

  const getInfo = async () => {
    getMealRecipeById(id).then((data) => {
      setFood(data);
      setFoodArray([data]);
      setIngredients(Object.keys(data).slice(NINE, TWENTY_NINE));
      setMeasure(Object.keys(data).slice(TWENTY_NINE, FORTY_EIGHT));
      setYoutube((data.strYoutube).replace('watch?v=', 'embed/'));
    });
  };

  const getRecommendedDrink = async () => {
    getAllDrinks().then((data) => {
      setDrink(data.slice(0, SIX));
    });
  };

  useEffect(() => {
    getInfo();
    getRecommendedDrink();
  }, []);

  // console.log(food);

  return (
    <div className="foodRecipeDetailsContainer">
      <Link to="/foods">
        <img src={ home } alt="Link para home" className="homeLink" />
      </Link>
      { food && (
        <div className="foodContainerDetails">
          <img
            src={ food.strMealThumb }
            alt={ `${food.strMeal}` }
            data-testid="recipe-photo"
            className="foodRecipeDetailsImage"
          />
          <div className="titleContainer">
            <h2 className="foodsTitle" data-testid="recipe-title">{food.strMeal}</h2>
            <h4 data-testid="recipe-category">{food.strCategory}</h4>
          </div>
          <Favorite food={ food } />
          <h4>Ingredients</h4>
          <div>
            {
              foodArray.map((item) => (
                <section key={ item } className="foodRecipeDetailsIngredients">
                  <div className="foodIngredientsContainer">
                    {
                      ingredients.map((ing, index) => (
                        <p
                          key={ ing }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          {item[ing]}
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
                          {item[meas]}
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
            <p>{ food.strInstructions }</p>
          </div>
          <h4>Recommended</h4>
          <div className="drinkRecommendedContainer">
            {drink && (
              drink.map((item, index) => (
                <div
                  key={ index }
                  className="drinkRecommended"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <Link to={ `/drinks/${item.idDrink}` }>
                    <img src={ item.strDrinkThumb } alt={ item.strDrink } />
                    <h3 data-testid={ `${index}-recomendation-title` }>
                      {item.strDrink}
                    </h3>
                    <p>{item.strAlcoholic}</p>
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="videoContainer">
            <iframe
              src={ youtube }
              title={ food.strMeal }
              width="100%"
              data-testid="video"
              alt="Video da receita"
            />
          </div>
        </div>
      )}
      <ButtonRecipe type="food" />
    </div>
  );
};

FoodRecipeDetails.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default FoodRecipeDetails;
