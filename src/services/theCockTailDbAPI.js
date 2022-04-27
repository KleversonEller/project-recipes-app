import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

export const fetchDrinkByName = async (name) => {
  const { data } = await api.get(`/search.php?s=${name}`);
  console.log(data.drinks);
  return data.drinks;
};

export const fetchDrinksByCategory = async (category) => {
  const { data } = await api.get(`/filter.php?c=${category}`);
  console.log(data.drinks);
  return data.drinks;
};

export const fetchDrinksByFirstLetter = async (primeiraLetra) => {
  const { data } = await api.get(`/search.php?f=${primeiraLetra}`);
  console.log(data.drinks);
  return data.drinks;
};

// export const fetchDrinksByArea = async (area) => {
//   const { data } = await api.get(`/filter.php?a=${area}`);
//   console.log(data.drinks);
//   return data.drinks;
// };

export const fetchDrinksByMainIngredient = async (mainIngredient) => {
  const { data } = await api.get(`/filter.php?i=${mainIngredient}`);
  console.log(data.drinks);
  return data.drinks;
};

export const fetchDrinkDetailsById = async (id) => {
  const { data } = await api.get(`/lookup.php?i=${id}`);
  console.log(data.drinks[0]);
  return data.drinks[0];
};

export const fetchRandomDrink = async () => {
  const { data } = await api.get('/random.php');
  console.log(data.drinks[0]);
  return data.drinks[0];
};

export const fetchAllDrinkCategories = async () => {
  const { data } = await api.get('/list.php?c=list');
  console.log(data.drinks);
  return data.drinks;
};
