/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchCategoryMeal } from '../services/theMealsDbAPI';
import { fetchCategoryCocktail } from '../services/theCockTailDbAPI';
import './Cards.css';

const Cards = ({ page }) => {
  const { list } = useSelector((state) => state?.query);
  const [categories, setCategories] = useState([]);
  const [fetchAll, setFetchAll] = useState(true);
  const [filterSelected, setFilterSelected] = useState('');
  const navigate = useNavigate();

  const getCategories = async () => {
    const getFoodsCategory = await fetchCategoryMeal();
    const getDrinksCategory = await fetchCategoryCocktail();
    switch (page) {
    case 'foods':
      setCategories(getFoodsCategory.map((category) => category.strCategory));
      break;
    case 'drinks':
      setCategories(getDrinksCategory.map((category) => category.strCategory));
      break;
    default:
      return navigate('/notfound');
    }
  };

  const changeFilter = async ({ target: { name } }) => {
    switch (name) {
    case 'all':
      setFetchAll(true); setFilterSelected('');
      break;
    case filterSelected:
      setFetchAll(true); setFilterSelected('');
      break;
    default:
      setFetchAll(false); setFilterSelected(name);
      break;
    }
  };

  useEffect(() => {
    if (fetchAll) { getCategories(); }
  }, [fetchAll]);

  return (
    <div className="card-container">
      {!list ? <p> Loading ... </p>
        : (
          <div>
            <button
              type="button"
              name="all"
              onClick={ changeFilter }
              data-testid="All-category-filter"
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={ uuidv4() }
                type="button"
                name={ category }
                onClick={ changeFilter }
                data-testid={ `${category}-category-filter` }
              >
                { category }
              </button>
            ))}
            {list.map((item, index) => (
              <div key={ uuidv4() }>
                <Link
                  to={ `/${page}/${item.id}` }
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
          </div>)}
    </div>
  );
};

Cards.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Cards;
