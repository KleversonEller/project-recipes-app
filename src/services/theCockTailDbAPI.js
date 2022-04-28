import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});

export const fetchAllCocktail = async () => {
  const limiterArray = 12;
  const { data } = await api.get('/search.php?s=');
  return data.drinks.slice(0, limiterArray);
};

export const fetchCategoryCocktail = async () => {
  const limiterArray = 5;
  const { data } = await api.get('/list.php?c=list');
  return data.drinks.slice(0, limiterArray);
};

export const fetchCocktailByCategory = async (category) => {
  const limiterArray = 12;
  const { data } = await api.get(`/filter.php?c=${category}`);
  return data.drinks.slice(0, limiterArray);
};
