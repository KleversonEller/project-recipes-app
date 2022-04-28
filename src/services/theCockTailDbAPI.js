export const fetchAllCocktail = async () => {
  const limiterArray = 12;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks.slice(0, limiterArray);
};

export const fetchCategoryCocktail = async () => {
  const limiterArray = 5;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks.slice(0, limiterArray);
};

export const fetchCocktailByCategory = async (category) => {
  const limiterArray = 12;
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks.slice(0, limiterArray);
};
