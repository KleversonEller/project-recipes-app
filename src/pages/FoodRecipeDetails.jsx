/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ButtonRecipe from '../components/ButtonRecipe';
import { getMealRecipeById } from '../services/theMealsDbAPI';
import { getAllDrinks } from '../services/theCockTailDbAPI';

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
  const [copied, setCopied] = useState();
  const [heartColor, setHeartColor] = useState(false);
  const { href } = window.location;

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

  const copyRecipe = () => {
    const time = 2000;
    const copy = clipboardCopy;
    copy(href);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    }, time);
  };

  const addFavorite = () => {
    setHeartColor(!heartColor);
    const favoriteFood = {
      id: food.idMeal,
      type: 'food',
      nationality: food.strArea,
      category: food.strCategory,
      alcoholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
    };
    const local = JSON.parse(localStorage.getItem(('favoriteRecipes')));
    if (!local || local.lenght === 0 || local === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteFood]));
    } else if (!heartColor === true) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, favoriteFood]));
    } else {
      const except = local.filter((item) => (item.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...except]));
    }
  };

  const verifyFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let sameId;
    if (local) {
      sameId = local.find((item) => (item.id === id));
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
          <div className="linkCopiedContainer">
            {copied && <p>{ copied }</p> }
          </div>
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
