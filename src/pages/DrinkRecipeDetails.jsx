/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ButtonRecipe from '../components/ButtonRecipe';

const DrinkRecipeDetails = () => {
  const params = useParams();
  const { id } = params;
  const seventeen = 17;
  const thirdTwo = 32;
  const fortySeven = 47;
  const [drink, setDrink] = useState();
  const [drinkArra, setDrinkArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [food, setFood] = useState([]);
  const [copied, setCopied] = useState();
  const [heartColor, setHeartColor] = useState(false);
  const url = `/drinks/${id}`;

  const getInfo = async () => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    setDrink(data.drinks[0]);
    setDrinkArray([data.drinks[0]]);
    setIngredients(Object.keys(data.drinks[0]).slice(seventeen, thirdTwo));
    setMeasure(Object.keys(data.drinks[0]).slice(thirdTwo, fortySeven));
  };
  // console.log(drink);

  const getRecommendedDrink = async () => {
    // const max = 19; // utilizar indicação aleatória no futuro
    const six = 6;
    // const i = Math.floor((Math.random() * max)); // gerar numero aleatório
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const foods = ((data.meals).slice(0, six));
    // console.log('data', foods);
    setFood(foods);
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

  const addFavorite = () => {
    setHeartColor(!heartColor);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const local = JSON.parse(localStorage.getItem(('favoriteRecipes')));
    if (!heartColor === true) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      }]));
    } else {
      const except = local.filter((item) => (item.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...except]));
    }
  };

  const verifyFavorite = () => {
    // console.log(localFavorite.length);
    const local = JSON.parse(localStorage.getItem(('favoriteRecipes')));
    let sameId;
    if (local) {
      sameId = local.find((item) => (
        item.id === id
      ));
    }
    if (sameId) {
      setHeartColor(true);
      // console.log(localFavorite, id);
      // console.log(sameId);
    }
  };

  useEffect(() => {
    getInfo();
    getRecommendedDrink();
    verifyFavorite();
  }, []);

  return (
    <div className="foodRecipeDetailsContainer">
      { drink && (
        <div>
          <img
            src={ drink.strDrinkThumb }
            alt={ `${drink.strDrink}` }
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
              onClick={ addFavorite }
            >
              <img
                className="foodRecipeDetailsIcon"
                src={ heartColor ? blackHeartIcon : heart }
                alt="heart-button"
                data-testid="favorite-btn"
              />
            </button>
          </div>
          <div>
            {copied && <p>{ copied }</p> }
          </div>
          <div>
            <h2 data-testid="recipe-title">{drink.strDrink}</h2>
            <h4 data-testid="recipe-category">{drink.strAlcoholic}</h4>
          </div>
          <h5>Ingredients</h5>
          <div>
            {
              drinkArra.map((item) => (
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
                  <img src={ item.strMealThumb } alt={ item.strMeal } />
                  <h3 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h3>
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
