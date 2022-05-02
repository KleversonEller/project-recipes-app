/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ButtonRecipe from '../components/ButtonRecipe';
import { getDrinkRecipeById } from '../services/theCockTailDbAPI';
import { getAllMeals } from '../services/theMealsDbAPI';

const DrinkRecipeDetails = () => {
  const { id } = useParams();
  const SIX = 6;
  const SEVENTEEN = 17;
  const THIRD_TWO = 32;
  const FORTY_SEVEN = 47;
  const TIMER = 2000;
  const [drink, setDrink] = useState();
  const [drinkArray, setDrinkArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [food, setFood] = useState([]);
  const [copied, setCopied] = useState();
  const [heartColor, setHeartColor] = useState(false);
  const { href } = window.location;

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

  const copyRecipe = () => {
    const copy = clipboardCopy;
    copy(href);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    }, TIMER);
  };

  const addFavorite = () => {
    setHeartColor(!heartColor);
    const favoriteDrink = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };
    const local = JSON.parse(localStorage.getItem(('favoriteRecipes')));
    if (!local || local.lenght === 0 || local === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrink]));
    } else if (!heartColor === true) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, favoriteDrink]));
    } else {
      const except = local.filter((item) => (item.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...except]));
    }
  };

  const verifyFavorite = () => {
    const local = JSON.parse(localStorage.getItem(('favoriteRecipes')));
    let sameId;
    if (local) {
      sameId = local.find((item) => (
        item.id === id
      ));
    }
    if (sameId) {
      setHeartColor(true);
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
