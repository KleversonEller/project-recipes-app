// const { meals } = await (await fetch(`${baseURL}`)).json();
const baseURL = 'https://www.themealdb.com/api/json/v1/1';
const DOZE = 12;
const CINCO = 5;

export const getMealsByIngredient = async (ingredient) => {
  const { meals } = await (await fetch(`${baseURL}/filter.php?i=${ingredient}`)).json();
  return meals.slice(0, DOZE);
};

export const getMealByName = async (food) => {
  const { meals } = await (await fetch(`${baseURL}/search.php?s=${food}`)).json();
  return meals === null ? meals : meals.slice(0, DOZE);
};

export const getMealsByFirstLetter = async (letter) => {
  const { meals } = await (await fetch(`${baseURL}/search.php?f=${letter}`)).json();
  return meals.slice(0, DOZE);
};

export const getMealRecipeById = async (id) => {
  const { meals } = await (await fetch(`${baseURL}/lookup.php?i=${id}`)).json();
  return meals[0];
};

export const getAllMeals = async () => {
  const { meals } = await (await fetch(`${baseURL}/search.php?s=`)).json();
  return meals.slice(0, DOZE);
};

export const getSurpriseMeal = async () => {
  const { meals } = await (await fetch(`${baseURL}/random.php`)).json();
  return meals[0];
};

export const getMealsByCategory = async (category) => {
  const { meals } = await (await fetch(`${baseURL}/filter.php?c=${category}`)).json();
  return meals.slice(0, DOZE);
};

export const getMealCategories = async () => {
  const { meals } = await (await fetch(`${baseURL}/list.php?c=list`)).json();
  return meals.slice(0, CINCO);
};

export const getAllMealNationalities = async () => {
  const { meals } = await (await fetch(`${baseURL}/list.php?a=list`)).json();
  return meals;
};

export const getAllMealIngredients = async () => {
  const { meals } = await (await fetch(`${baseURL}/list.php?i=list`)).json();
  return meals;
};
