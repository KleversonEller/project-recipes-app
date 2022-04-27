import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchAllMeal } from '../services/theMealsDbAPI';
import fetchAllCocktail from '../services/theCockTailDbAPI';

const Cards = ({ page }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const getApiFoods = await fetchAllMeal();
      const getApiDrinks = await fetchAllCocktail();
      switch (page) {
      case 'food':
        return setList(getApiFoods);
      case 'drink':
        return setList(getApiDrinks);
      default:
        return setList(['Sorry, we haven\'t found any recipes for these filters.']);
      }
    };
    getList();
  }, [page]);
  return (
    <div>
      {page === 'food' && (list.length > 1 ? (
        list.map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              width="200px"
              alt={ `Ilustração de ${food.strMeal}` }
            />
            <span data-testid={ `${index}-card-name` }>
              {food.strMeal}
            </span>
          </div>
        )))
        : (
          <alert>
            { list[0] }
          </alert>))}
      {page === 'drink' && (list.length > 1 ? (
        list.map((drink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              width="200px"
              alt={ `Ilustração de ${drink.strDrink}` }
            />
            <span data-testid={ `${index}-card-name` }>
              {drink.strDrink}
            </span>
          </div>
        )))
        : (
          <alert>
            { list[0] }
          </alert>))}
    </div>
  );
};

Cards.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Cards;
