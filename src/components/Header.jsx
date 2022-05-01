/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/header.css';
import { saveSearch } from '../actions';
import {
  fetchAllMeal,
  getMealsByIngredient,
  getMealByName,
  getMealsByFirstLetter,
} from '../services/theMealsDbAPI';
import {
  fetchAllCocktail,
  getDrinksByIngredient,
  getDrinkByName,
  getDrinksByFirstLetter,
} from '../services/theCockTailDbAPI';

const Header = ({ title, search }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [query, setQuery] = useState(null);
  const [searchType, setSearchType] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    const api = {
      Meal: {
        ingredient: () => getMealsByIngredient(query),
        name: () => getMealByName(query),
        firstLetter: () => getMealsByFirstLetter(query),
      },
      Drink: {
        ingredient: () => getDrinksByIngredient(query),
        name: () => getDrinkByName(query),
        firstLetter: () => getDrinksByFirstLetter(query),
      },
    };

    if (searchType === 'firstLetter' && query.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      api[title][searchType]()
        .then((result) => {
          switch (true) {
          case result === null:
            return global
              .alert('Sorry, we haven\'t found any recipes for these filters.');
          case result.length === 1:
            return navigate(`/${title === 'Meal'
              ? `foods/${result[0].idMeal}`
              : `drinks/${result[0].idDrink}`}`);
          case result.length > 1:
            return dispatch(saveSearch(result.map((item) => ({
              name: item[`str${title}`],
              id: item[`id${title}`],
              image: item[`str${title}Thumb`],
            }))));
          default:
            return null;
          }
        });
    }
  };

  useEffect(() => {
    if (title === 'Meal') {
      fetchAllMeal().then((result) => dispatch(saveSearch(result.map((food) => ({
        image: food.strMealThumb,
        id: food.idMeal,
        name: food.strMeal,
      })))));
    } else {
      fetchAllCocktail().then((result) => dispatch(saveSearch(result.map((drink) => ({
        image: drink.strDrinkThumb,
        id: drink.idDrink,
        name: drink.strDrink,
      })))));
    }
  }, []);

  return (
    <div>
      <div className="headerContainer">
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Icone de usuario"
          />
        </Link>
        <h1 data-testid="page-title">
          {title}
        </h1>
        {search && (
          <button
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Icone de busca"
            />
          </button>)}
      </div>
      <div>
        {searchBar && (
          <div className="searchBarContainer">
            <input
              type="text"
              data-testid="search-input"
              placeholder="Type your search"
              onChange={ ({ target: { value } }) => setQuery(value) }
            />
            <div className="searchBarRadioButtons">
              <label htmlFor="ingredient">
                <input
                  type="radio"
                  name="ingredient"
                  checked={ searchType === 'ingredient' }
                  onChange={ ({ target: { name } }) => setSearchType(name) }
                  data-testid="ingredient-search-radio"
                />
                Ingredient
              </label>
              <label htmlFor="name">
                <input
                  type="radio"
                  name="name"
                  checked={ searchType === 'name' }
                  onChange={ ({ target: { name } }) => setSearchType(name) }
                  data-testid="name-search-radio"
                />
                Name
              </label>
              <label htmlFor="firstLetter">
                <input
                  type="radio"
                  name="firstLetter"
                  checked={ searchType === 'firstLetter' }
                  onChange={ ({ target: { name } }) => setSearchType(name) }
                  data-testid="first-letter-search-radio"
                />
                First Letter
              </label>
            </div>
            <button
              type="button"
              onClick={ handleSearch }
              data-testid="exec-search-btn"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.string,
}.isRequired;

export default Header;
