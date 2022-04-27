import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});

const fetchAllCocktail = async () => {
  const limiterArray = 12;
  const { data } = await api.get('/search.php?s=');
  return data.drinks.slice(0, limiterArray);
};

export default fetchAllCocktail;
