import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchAllMeal,
  fetchCategoryMeal,
  fetchMealsByCategory,
} from '../services/theMealsDbAPI';
import { fetchAllCocktail,
  fetchCategoryCocktail,
  fetchCocktailByCategory,
} from '../services/theCockTailDbAPI';

uuidv4();

const Cards = ({ page }) => {
  const [list, setList] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [fetchAll, setFetchAll] = useState(true);
  const [filterSelected, setFilterSelected] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      const getApiFoods = await fetchAllMeal();
      const getFoodsCategory = await fetchCategoryMeal();
      const getApiDrinks = await fetchAllCocktail();
      const getDrinksCategory = await fetchCategoryCocktail();
      switch (page) {
      case 'foods':
        setList(getApiFoods.map((food) => ({
          image: food.strMealThumb,
          name: food.strMeal,
          id: food.idMeal,
        })));
        setCategorys(getFoodsCategory.map((category) => category.strCategory));
        break;
      case 'drinks':
        setList(getApiDrinks.map((drink) => ({
          image: drink.strDrinkThumb,
          name: drink.strDrink,
          id: drink.idDrink,
        })));
        setCategorys(getDrinksCategory.map((category) => category.strCategory));
        break;
      default:
        return navigate('/notfound');
      }
    };
    if (fetchAll) { getList(); }
  }, [fetchAll]);

  const changeFilter = async ({ target }) => {
    const { name } = target;

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

    if (page === 'foods' && name !== 'all') {
      const getList = await fetchMealsByCategory(name);
      setList(getList.map((food) => ({
        image: food.strMealThumb,
        id: food.idMeal,
        name: food.strMeal,
      })));
    }
    if (page === 'drinks' && name !== 'all') {
      const getList = await fetchCocktailByCategory(name);
      setList(getList.map((drink) => ({
        image: drink.strDrinkThumb,
        id: drink.idDrink,
        name: drink.strDrink,
      })));
    }
  };

  return (
    <div>
      {categorys.length === 0 ? <p> Loading ... </p>
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
            {categorys.map((category) => (
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
            {list.map((food, index) => (
              <div key={ uuidv4() }>
                <Link
                  to={ `/${page}/${food.id}` }
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
