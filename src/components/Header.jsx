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
  getAllMeals,
  getMealsByIngredient,
  getMealByName,
  getMealsByFirstLetter,
} from '../services/theMealsDbAPI';
import {
  getAllDrinks,
  getDrinksByIngredient,
  getDrinkByName,
  getDrinksByFirstLetter,
} from '../services/theCockTailDbAPI';

const Header = ({ title, search }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [query, setQuery] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const api = {
    Meal: {
      ingredient: () => getMealsByIngredient(query),
      name: () => getMealByName(query),
      firstLetter: () => getMealsByFirstLetter(query),
      getAll: () => getAllMeals(),
      string: 'Foods',
      url: 'foods',
    },
    Drink: {
      ingredient: () => getDrinksByIngredient(query),
      name: () => getDrinkByName(query),
      firstLetter: () => getDrinksByFirstLetter(query),
      getAll: () => getAllDrinks(),
      string: 'Drinks',
      url: 'drinks',
    },
  };

  const handleSearch = () => {
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
            return navigate(`/${api[title].url}/${result[0][`id${title}`]}`);
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

  const getItems = () => {
    if (title === 'Meal' || title === 'Drink') {
      api[title].getAll().then((result) => dispatch(saveSearch(result.map((item) => ({
        image: item[`str${title}Thumb`],
        id: item[`id${title}`],
        name: item[`str${title}`],
      })))));
    }
  };

  useEffect(() => {
    getItems();
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
          {api[title]?.string ? api[title].string : title}
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
