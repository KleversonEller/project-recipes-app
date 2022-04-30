import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FoodRecipeInProgress = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const returnFood = () => {
    navigate(`/foods/${id}`);
  };

  const doneRecipes = () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id,
    }]));
    navigate(`/foods/${id}`);
  };

  return (
    <div>
      <p>FoodRecipeInProgress</p>
      <button type="button" onClick={ returnFood }>Voltar</button>
      <button type="button" onClick={ doneRecipes }>Finalizar receita</button>
    </div>
  );
};

export default FoodRecipeInProgress;
