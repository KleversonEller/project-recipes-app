import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllMealNationalities, getAllMeals } from '../services/theMealsDbAPI';
import NationalityCard from '../components/NationalityCard';
import '../css/exploreByNationality.css';

function ExFoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [foodsCard, setFoodsCard] = useState([]);

  const MAXIMUM_RENDER = '12';

  const fetchAPI = async (endpoint, type) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data[type];
  };

  // Fetch para buscar todas as nacionalidades do dropdown.
  useEffect(() => {
    async function fetchNationalities() {
      const nationalitiesTypes = await getAllMealNationalities();
      setNationalities(nationalitiesTypes);
    }
    fetchNationalities();
  }, []);

  // Fetch API para renderizar cards.
  useEffect(() => {
    async function fetchFoods() {
      const foodsInfo = await getAllMeals();
      setFoodsCard(foodsInfo);
    }
    fetchFoods();
  }, []);

  // Fetch para buscar cards por nacionalidade selecionada
  async function fetchNationalitiesCards(value) {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    const nationalitieCards = await fetchAPI(URL, 'meals');
    setFoodsCard(nationalitieCards);
  }

  const handleChange = async ({ target: { value } }) => {
    if (value === 'All') {
      const foodsInfo = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
      setFoodsCard(foodsInfo);
    } else {
      fetchNationalitiesCards(value);
    }
  };

  return (
    <div className="exploreByNationalityContainer">
      <Header headerTitle="Explore Nationalities" />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleChange }
      >
        <option value="All" data-testid="All-option">All</option>
        {
          nationalities.length > 1 && nationalities
            .map(({ strArea }) => (
              <option
                data-testid={ `${strArea}-option` }
                key={ strArea }
                value={ strArea }
              >
                { strArea }
              </option>
            ))
        }
      </select>
      <div className="recipes-container">
        {
          foodsCard && foodsCard
            .filter((_, index) => index < MAXIMUM_RENDER)
            .map((recipe, index) => (
              <NationalityCard
                key={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
                type="Meal"
              />
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExFoodsNationalities;
