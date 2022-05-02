/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMealCategories,
  getAllMeals,
  getMealsByCategory } from '../services/theMealsDbAPI';
import {
  getDrinkCategories,
  getAllDrinks,
  getDrinksByCategory } from '../services/theCockTailDbAPI';
import { saveSearch } from '../actions';
import '../css/cards.css';

const Cards = ({ page }) => {
  const { list } = useSelector((state) => state?.query);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const api = {
    AllMeals: () => getAllMeals(),
    MealCategories: () => getMealCategories(),
    MealsByCategory: (c) => getMealsByCategory(c),
    AllDrinks: () => getAllDrinks(),
    DrinkCategories: () => getDrinkCategories(),
    DrinksByCategory: (c) => getDrinksByCategory(c),
    Drink: 'drinks',
    Meal: 'foods',
  };

  const changeCategory = (name) => {
    api[name !== 'all' ? `${page}sByCategory` : `All${page}s`](name !== 'all' ? name : '')
      .then((result) => dispatch(saveSearch(result.map((item) => ({
        name: item[`str${page}`],
        id: item[`id${page}`],
        image: item[`str${page}Thumb`],
      })))));
  };

  useEffect(() => {
    api[`${page}Categories`]().then((result) => setCategories(
      result.map((i) => i.strCategory),
    ));
  }, []);

  return (
    <div>
      {!list ? <p> Loading ... </p>
        : (
          <div className="cardContainer">
            <div className="card-container-filter">
              <button
                type="button"
                name="all"
                onClick={ ({ target: { name } }) => (changeCategory(name)) }
                data-testid="All-category-filter"
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={ uuidv4() }
                  type="button"
                  name={ category }
                  onClick={ ({ target: { name } }) => (changeCategory(name)) }
                  data-testid={ `${category}-category-filter` }
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="card-container-cards">
              {list.map((item, index) => (
                <div key={ uuidv4() } className="cards">
                  <Link
                    to={ `/${api[page]}/${item.id}` }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ item.image }
                      width="150px"
                      alt={ `Ilustração de ${item.name}` }
                    />
                    <span data-testid={ `${index}-card-name` }>
                      {item.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>)}
    </div>
  );
};

Cards.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Cards;
