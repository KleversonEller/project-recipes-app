import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoritIcon from '../images/blackHeartIcon.svg';
import { getMealRecipeById } from '../services/theMealsDbAPI';
import { getDrinkRecipeById } from '../services/theCockTailDbAPI';

const RecipeInProgress = ({ id, page }) => {
  const [recipe, setRecipe] = useState();

  const getFood = async () => {
    const fetchRecipe = await getMealRecipeById(id);
    const ingredientes = Object
      .keys(fetchRecipe).filter((key) => key.includes('strIngredient'));
    setRecipe({
      image: fetchRecipe.strMealThumb,
      name: fetchRecipe.strMeal,
      category: fetchRecipe.strCategory,
      ingredients: ingredientes
        .map((ingrediente) => (fetchRecipe[ingrediente])),
      preparation: fetchRecipe.strInstructions,
    });
  };

  const getDrink = async () => {
    const fetchRecipe = await getDrinkRecipeById(id);
    const ingredientes = Object
      .keys(fetchRecipe).filter((key) => key.includes('strIngredient'));
    setRecipe({
      image: fetchRecipe.strDrinkThumb,
      name: fetchRecipe.strDrink,
      category: fetchRecipe.strCategory,
      ingredients: ingredientes
        .map((ingrediente) => (fetchRecipe[ingrediente])),
      preparation: fetchRecipe.strInstructions,
    });
  };

  useEffect(() => {
    const getRecipe = async () => {
      if (page === 'foods') {
        getFood();
      }
      if (page === 'drinks') {
        getDrink();
      }
    };
    getRecipe();
  }, []);

  return (
    <div>
      {recipe ? (
        <div>
          <img
            data-testid="recipe-photo"
            src={ recipe.image }
            width="150px"
            alt={ `Ilustração de ${recipe.name}` }
          />
          <span data-testid="recipe-title">
            {recipe.name}
          </span>
          <button
            type="button"
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="Icone de compartilhante"
            />
          </button>
          <button
            type="button"
          >
            <img
              data-testid="favorite-btn"
              src={ favoritIcon }
              alt="Icone de favorita"
            />
          </button>
          <span data-testid="recipe-category">
            {recipe.category}
          </span>
          <ul>
            {recipe.ingredients.map((ingredient, index) => ingredient && (
              <li
                data-testid={ `${index}-ingredient-step` }
                key={ ingredient }
              >
                <label htmlFor={ ingredient }>
                  <input
                    id={ ingredient }
                    type="checkbox"
                    value={ ingredient }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
          <span data-testid="instructions">
            {recipe.preparation}
          </span>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            finalizar
          </button>
        </div>
      )
        : <p> loading ...</p>}
    </div>
  );
};

RecipeInProgress.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
