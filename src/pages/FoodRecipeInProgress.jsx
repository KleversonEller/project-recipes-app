import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';

const FoodRecipeInProgress = () => {
  const params = useParams();
  return (
    <RecipeInProgress id={ params.id } page="foods" />
  );
};

export default FoodRecipeInProgress;
