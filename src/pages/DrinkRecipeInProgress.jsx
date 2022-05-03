import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';
import { getDrinkRecipeById } from '../services/theCockTailDbAPI';

const DrinkRecipeInProgress = () => {
  const params = useParams();
  const { id } = params;
  const [recipe, setRecipe] = useState();
  const [local, setLocal] = useState({ cocktails: {}, meals: {} });

  useEffect(() => {
    const getRecipe = async () => {
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

    const getLocal = () => {
      const saveLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const valida = saveLocal ? saveLocal.cocktails[id] : [];
      setLocal(valida);
    };

    getLocal();
    getRecipe();
  }, []);

  return (
    <RecipeInProgress id={ params.id } page="drinks" recipe={ recipe } local={ local } />
  );
};

export default DrinkRecipeInProgress;
