import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';
import { getMealRecipeById } from '../services/theMealsDbAPI';

const FoodRecipeInProgress = () => {
  const params = useParams();
  const { id } = params;
  const [recipe, setRecipe] = useState();
  const [local, setLocal] = useState({ cocktails: {}, meals: {} });

  useEffect(() => {
    const getRecipe = async () => {
      const fetchRecipe = await getMealRecipeById(id);
      const ingredientes = Object
        .keys(fetchRecipe).filter((key) => key.includes('strIngredient'));
      setRecipe({
        image: fetchRecipe.strMealThumb,
        name: fetchRecipe.strMeal,
        category: fetchRecipe.strCategory,
        ingredients: ingredientes
          .map((ingrediente) => (fetchRecipe[ingrediente] !== null
                && fetchRecipe[ingrediente])),
        preparation: fetchRecipe.strInstructions,
      });
    };

    const getLocal = () => {
      const saveLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const valida = saveLocal ? saveLocal.meals[id] : [];
      setLocal(valida);
    };

    getLocal();
    getRecipe();
  }, []);

  return (
    <RecipeInProgress id={ params.id } page="foods" recipe={ recipe } local={ local } />
  );
};

export default FoodRecipeInProgress;
