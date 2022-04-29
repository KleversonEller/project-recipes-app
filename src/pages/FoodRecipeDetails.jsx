/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import shareIcon from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';

const FoodRecipeDetails = () => {
  const id = 52771;
  const nine = 9;
  const Tnine = 29;
  const Feight = 48;
  const [food, setFood] = useState();
  const [foodArra, setFoodArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [drink, setDrink] = useState([]);
  const [randomDrinks, setRandomDrinks] = useState([]);
  const getInfo = async () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    setFood(data.meals[0]);
    setFoodArray([data.meals[0]]);
    setIngredients(Object.keys(data.meals[0]).slice(nine, Tnine));
    setMeasure(Object.keys(data.meals[0]).slice(Tnine, Feight));
  };

  const getRecommendedDrink = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    setDrink([data.drinks]);
    setRandomDrinks([drink[0][0],
      drink[0][1], drink[0][2], drink[0][3], drink[0][4], drink[0][5]]);
  };

  useEffect(() => {
    getInfo();
    getRecommendedDrink();
  }, []);
  console.log('fo', food);
  console.log('d', drink);
  console.log('g', randomDrinks);

  return (
    <div className="foodRecipeDetailsContainer">
      { food && (
        <div>
          <img
            src={ food.strMealThumb }
            alt={ `${food.strMeal}` }
            data-testid="recipe-photo"
            className="foodRecipeDetailsImage"
          />
          <div className="iconsContainer">
            <img
              className="foodRecipeDetailsIcon"
              src={ shareIcon }
              alt="share-button"
              data-testid="share-btn"
            />
            <img
              className="foodRecipeDetailsIcon"
              src={ heart }
              alt="heart-button"
              data-testid="favorite-btn"
            />
          </div>
          <h2 data-testid="recipe-title">{food.strMeal}</h2>
          <p data-testid="recipe-category">{food.strCategory}</p>
          <p>Ingredients</p>
          <div>
            {
              foodArra.map((item, index) => (
                <section key={ index } className="foodRecipeDetailsIngredients">
                  <div className="foodIngredientsContainer">
                    {
                      ingredients.map((ing) => (
                        <p
                          key={ ing }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          {item[ing]}
                          :
                        </p>
                      ))
                    }
                  </div>
                  <div key={ index + 100 } className="foodMesaureContainer">
                    {
                      measure.map((meas) => (
                        <p key={ meas }>
                          {item[meas]}
                        </p>
                      ))
                    }
                  </div>
                </section>
              ))
            }
          </div>
          <div data-testid="instructions" className="foodInstructions">
            <p>{ food.strInstructions }</p>
          </div>
          <div className="videoContainer">
            <ReactPlayer
              url={ food.strYoutube }
              width="100%"
              height="100%"
              controls
              data-testid="video"
            />
          </div>
          <h4>Recommended</h4>
          <div>
            <div className="drinkRecommendedContainer">
              {drink && (
                drink[0].map((item, index) => (
                  <div key={ index } className="drinkRecommended">
                    <img src={ item.strDrinkThumb } alt={ item.strDrink } />
                    <h4>{item.strDrink}</h4>
                    <p>{item.strAlcoholic}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <button type="button" className="btn-start">Start Recipe</button>
    </div>
  );
};

export default FoodRecipeDetails;
