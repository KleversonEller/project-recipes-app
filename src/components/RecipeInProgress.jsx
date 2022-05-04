/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Favorite from './Favorite';
import DoneRecipe from './DoneRecipe';

const RecipeInProgress = ({ id, recipe, page, local, data }) => {
  const [done, setDone] = useState([]);
  const [saveLocal, setSaveLocal] = useState({ cocktails: {}, meals: {} });

  useEffect(() => {
    const getDone = () => {
      setDone(local);
    };

    getDone();
  }, [local]);

  useEffect(() => {
    const handleLocal = () => {
      switch (page) {
      case 'food':
        setSaveLocal({ ...saveLocal, meals: { ...saveLocal.meals, [id]: done } });
        break;
      case 'drink':
        setSaveLocal({ ...saveLocal, cocktails: { ...saveLocal.cocktails, [id]: done } });
        break;
      default:
        break;
      }
    };

    if (done.length > 0) { handleLocal(); }
  }, [done]);

  useEffect(() => {
    const setSave = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(saveLocal));
    };
    if (done.length > 0) { setSave(); }
  }, [saveLocal]);

  const handleDone = ({ target }) => {
    const { checked, value } = target;
    return checked ? setDone([...done, value])
      : setDone(done.filter((ingredient) => ingredient !== value));
  };

  return (
    <div className="foodContainerDetails">
      {recipe ? (
        <div>
          <img
            className="foodRecipeDetailsImage"
            data-testid="recipe-photo"
            src={ recipe.image }
            width="150px"
            alt={ `Ilustração de ${recipe.name}` }
          />
          <div className="titleContainer">
            <h2 data-testid="recipe-title">
              {recipe.name}
            </h2>
            <h4 data-testid="recipe-category">
              {recipe.category}
            </h4>
          </div>
          <Favorite food={ data } type={ page } />
          <div className="foodRecipeProgressIngredients">
            <ul>
              {recipe.ingredients.map((ingredient, index) => ingredient && (
                <li
                  data-testid={ `${index}-ingredient-step` }
                  key={ ingredient }
                >
                  <label htmlFor={ ingredient }>
                    <input
                      id={ ingredient }
                      onChange={ handleDone }
                      checked={ done.some((value) => value === ingredient) }
                      type="checkbox"
                      value={ ingredient }
                    />
                    {ingredient}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="foodRecipeInstructions">
            <span data-testid="instructions">
              {recipe.preparation}
            </span>
          </div>
          <DoneRecipe
            disabled={ done.length !== recipe.ingredients
              .filter((value) => value !== undefined && value).length }
            food={ data }
            type={ page }
            className="buttomRecipeContainer"
          />
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
