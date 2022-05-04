import React, { useEffect, useState } from 'react';
import DoneAndFavoriteCard from '../components/DoneAndFavoriteCard';
import Header from '../components/Header';
import '../css/done.css';

function DoneRecipes() {
  const [recipesFromStorage, setRecipesFromStorage] = useState([]);
  const [filteredRecipes, filterRecipes] = useState([]);

  useEffect(() => {
    const getRecipesFromStorage = () => {
      const doneRecipes = localStorage.getItem('doneRecipes');
      if (doneRecipes) {
        const results = JSON.parse(localStorage.getItem('doneRecipes'));
        setRecipesFromStorage(results);
        filterRecipes(results);
      }
    };
    getRecipesFromStorage();
  }, []);

  const handleClick = ({ target: { value } }) => {
    if (value === 'all') {
      filterRecipes(recipesFromStorage);
    } else {
      const filteredCategory = recipesFromStorage
        .filter((recipe) => (recipe.type === value));
      filterRecipes(filteredCategory);
    }
  };

  return (
    <div className="doneRecipesContainer">
      <Header title="Done Recipes" search={ false } />
      <div className="favoriteFilters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleClick }
        >
          All categories
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ handleClick }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleClick }
        >
          Drinks
        </button>
      </div>
      <div className="done-fav-cards-container">
        { filteredRecipes
          .map((recipe, index) => (
            <DoneAndFavoriteCard
              isFavoriteRecipes={ false }
              key={ index }
              setRecipesFromStorage={ setRecipesFromStorage }
              recipe={ recipe }
              index={ index }
            />
          ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
