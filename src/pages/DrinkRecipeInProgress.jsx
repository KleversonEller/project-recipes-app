import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DrinkRecipeInProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doneRecipes = () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id,
    }]));
    navigate(`/drinks/${id}`);
  };

  return (
    <div>
      <p>DrinkRecipeInProgress</p>
      <button type="button" onClick={ () => navigate(`/drinks/${id}`) }>Voltar</button>
      <button type="button" onClick={ doneRecipes }>Finalizar receita</button>
    </div>
  );
};

export default DrinkRecipeInProgress;
