/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/button.css';

const ButtonRecipe = (props) => {
  const params = useParams();
  const { id } = params;
  const { type } = props;
  const [namebtn, setNameBtn] = useState('Start Recipe');
  const [stateButton, setStateButton] = useState(true);
  const navigate = useNavigate();

  const recipeInProgress = () => {
    if (type === 'drink') {
      const cocktails = {};
      cocktails[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails }));
      navigate(`/drinks/${id}/in-progress`);
    } else if (type === 'food') {
      const meals = {};
      meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify({ meals }));
      navigate(`/foods/${id}/in-progress`);
    }
    // console.log(id, type);
  };

  const verifyInProgressRecipe = () => {
    const localInProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (localInProgressRecipe) {
      if (localInProgressRecipe.cocktails) {
        // console.log('ooo', Object.keys(localInProgressRecipe.cocktails));
        const IDlocalInProgressRecipe = Object.keys(localInProgressRecipe.cocktails);
        // console.log(IDlocalInProgressRecipe, id);
        if (IDlocalInProgressRecipe[0] === id) {
          setNameBtn('Continue Recipe');
        }
      } else if (localInProgressRecipe.meals) {
        // console.log('ooo', Object.keys(localInProgressRecipe.meals));
        // console.log(localInProgressRecipe.meals);
        const IDlocalInProgressRecipe = Object.keys(localInProgressRecipe.meals);
        // console.log(IDlocalInProgressRecipe, id);
        if (IDlocalInProgressRecipe[0] === id) {
          setNameBtn('Continue Recipe');
        }
      }
    }
  };

  const verifyDoneRecipes = () => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (localDoneRecipes) {
      console.log(localDoneRecipes);
      if (localDoneRecipes[0].id === id) {
        console.log('receita finalizada');
        setStateButton(false);
      }
    }
  };

  useEffect(() => {
    verifyInProgressRecipe();
    verifyDoneRecipes();
  }, []);

  return (
    <div className="buttomRecipeContainer">
      {stateButton && (
        <button
          className="btn-start"
          type="button"
          onClick={ recipeInProgress }
          data-testid="start-recipe-btn"
        >
          { namebtn }
        </button>
      )}
    </div>
  );
};

ButtonRecipe.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default ButtonRecipe;
