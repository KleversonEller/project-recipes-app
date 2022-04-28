import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { fetchAllMeal,
  fetchCategoryMeal,
  fetchMealsByCategory,
} from '../services/theMealsDbAPI';
import { fetchAllCocktail,
  fetchCategoryCocktail,
  fetchCocktailByCategory,
} from '../services/theCockTailDbAPI';

const Cards = ({ page }) => {
  const [list, setList] = useState([]);
  const [categorys, setCategorys] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      const getApiFoods = await fetchAllMeal();
      const getFoodsCategory = await fetchCategoryMeal();
      const getApiDrinks = await fetchAllCocktail();
      const getDrinksCategory = await fetchCategoryCocktail();
      console.log(getApiFoods);
      switch (page) {
      case 'food':
        setList(getApiFoods.map((food) => ({
          image: food.strMealThumb,
          name: food.strMeal,
        })));
        setCategorys(getFoodsCategory.map((category) => category.strCategory));
        break;
      case 'drink':
        setList(getApiDrinks.map((drink) => ({
          image: drink.strDrinkThumb,
          name: drink.strDrink,
        })));
        setCategorys(getDrinksCategory.map((category) => category.strCategory));
        break;
      default:
        return navigate('/notfound');
      }
    };
    getList();
  }, []);

  const changeFilter = async ({ target }) => {
    const { name } = target;
    if (page === 'food') {
      const getList = await fetchMealsByCategory(name);
      setList(getList.map((food) => ({
        image: food.strMealThumb,
        name: food.strMeal,
      })));
    }
    if (page === 'drink') {
      const getList = await fetchCocktailByCategory(name);
      setList(getList.map((drink) => ({
        image: drink.strDrinkThumb,
        name: drink.strDrink,
      })));
    }
  };

  return (
    <div>
      {categorys.length === 0 ? <p> Loading ... </p>
        : (
          <div>
            {categorys.map((category, index) => (
              <button
                key={ index }
                type="button"
                name={ category }
                onClick={ changeFilter }
                data-testid={ `${category}-category-filter` }
              >
                { category }
              </button>
            ))}
            {list.map((food, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.image }
                  width="150px"
                  alt={ `Ilustração de ${food.name}` }
                />
                <span data-testid={ `${index}-card-name` }>
                  {food.name}
                </span>
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
