import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DrinkRecipeInProgress = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const returnDrink = () => {
    navigate(`/drinks/${id}`);
  };

  const doneRecipes = () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id,
    }]));
    navigate(`/drinks/${id}`);
  };

  return (
    <div>
      <p>DrinkRecipeInProgress</p>
      <button type="button" onClick={ returnDrink }>Voltar</button>
      <button type="button" onClick={ doneRecipes }>Finalizar receita</button>
    </div>
  );
};

export default DrinkRecipeInProgress;
