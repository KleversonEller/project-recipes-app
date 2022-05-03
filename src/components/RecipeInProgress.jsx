import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoritIcon from '../images/blackHeartIcon.svg';

const RecipeInProgress = ({ id, recipe, page, local }) => {
  const [done, setDone] = useState([]);
  const [saveLocal, setSaveLocal] = useState({ cocktails: {}, meals: {} });
  const navigate = useNavigate();

  useEffect(() => {
    const getDone = () => {
      setDone(local);
    };

    getDone();
  }, [local]);

  useEffect(() => {
    const handleLocal = () => {
      switch (page) {
      case 'foods':
        setSaveLocal({ ...saveLocal, meals: { ...saveLocal.meals, [id]: done } });
        break;
      case 'drinks':
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
          <span data-testid="instructions">
            {recipe.preparation}
          </span>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ done.length !== recipe.ingredients
              .filter((value) => value !== undefined && value).length }
            onClick={ () => navigate('/done-recipes') }
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
