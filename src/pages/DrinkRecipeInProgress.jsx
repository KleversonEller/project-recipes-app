import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';

const DrinkRecipeInProgress = () => {
  const params = useParams();
  return (
    <RecipeInProgress id={ params.id } page="drinks" />
  );
};

export default DrinkRecipeInProgress;
