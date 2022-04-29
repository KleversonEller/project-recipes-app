/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
  const [youtube, setYoutube] = useState();
  const [copied, setCopied] = useState();
  const [heartColor, setHeartColor] = useState(false);
  const navigate = useNavigate();
  const url = `/foods/${id}`;

  const getInfo = async () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    setFood(data.meals[0]);
    setFoodArray([data.meals[0]]);
    setIngredients(Object.keys(data.meals[0]).slice(nine, Tnine));
    setMeasure(Object.keys(data.meals[0]).slice(Tnine, Feight));
    setYoutube((data.meals[0].strYoutube).replace('watch?v=', 'embed/'));
  };
  // console.log(food);

  const getRecommendedDrink = async () => {
    // const max = 19; // utilizar indicação aleatória no futuro
    const six = 6;
    // const i = Math.floor((Math.random() * max)); // gerar numero aleatório
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const drinks = ((data.drinks).slice(0, six));
    setDrink(drinks);
  };

  const recipeInProgress = () => {
    navigate(`/foods/${id}/in-progress`);
  };

  const copyRecipe = () => {
    const time = 2000;
    const copy = clipboardCopy;
    copy(`http://localhost:3000${url}`);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    }, time);
  };

  useEffect(() => {
    getInfo();
    getRecommendedDrink();
  }, []);

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
            <button
              type="button"
              onClick={ copyRecipe }
            >
              <img
                className="foodRecipeDetailsIcon"
                src={ shareIcon }
                alt="share-button"
                data-testid="share-btn"
              />
            </button>
            <button
              type="button"
              onClick={ () => setHeartColor(!heartColor) }
            >
              <img
                className="foodRecipeDetailsIcon"
                src={ heartColor ? blackHeartIcon : heart }
                alt="heart-button"
                data-testid="favorite-btn"
              />
            </button>
          </div>
          <div className="linkCopiedContainer">
            {copied && <p>{ copied }</p> }
          </div>
          <div>
            <h2 data-testid="recipe-title">{food.strMeal}</h2>
            <h4 data-testid="recipe-category">{food.strCategory}</h4>
          </div>
          <h5>Ingredients</h5>
          <div>
            {
              foodArra.map((item) => (
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
          <div data-testid="instructions" className="foodInstructions">
            <p>{ food.strInstructions }</p>
          </div>
          <div className="videoContainer">
            <iframe
              src={ youtube }
              title={ food.strMeal }
              width="100%"
              data-testid="video"
            />
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
                  <img src={ item.strDrinkThumb } alt={ item.strDrink } />
                  <h3 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h3>
                  <p>{item.strAlcoholic}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        className="btn-start"
        data-testid="start-recipe-btn"
        onClick={ recipeInProgress }
      >
        Start Recipe

      </button>
    </div>
  );
};

export default FoodRecipeDetails;
