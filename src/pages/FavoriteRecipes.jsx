import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneAndFavoriteCard from '../components/DoneAndFavoriteCard';
import '../css/favoriteRecipes.css';
// import '../css/favorites.css';

function FavoriteRecipes() {
  const [recipesFromStorage, setRecipesFromStorage] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const getRecipesFromStorage = () => {
      const doneRecipes = localStorage.getItem('favoriteRecipes');
      if (doneRecipes) {
        const results = JSON.parse(localStorage.getItem('favoriteRecipes'));
        setRecipesFromStorage(results);
      }
    };
    getRecipesFromStorage();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredRecipes(recipesFromStorage);
    } else {
      const filteredCategory = recipesFromStorage
        .filter((recipe) => (recipe.type === filter));
      setFilteredRecipes(filteredCategory);
    }
  }, [recipesFromStorage, filter]);

  const handleClick = ({ target }) => {
    const { value } = target;
    if (filter !== value) {
      setFilter(value);
    }
  };

  return (
    <div className="favoriteRecipesContainer">
      <Header title="Favorite Recipes" />
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

export default FavoriteRecipes;
