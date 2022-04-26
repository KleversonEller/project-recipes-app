async function fetchMealByName(name) {
  const url = `www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return err;
  }
}

async function fetchMealsByCategory(category) {
  const url = `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return err;
  }
}

async function fetchMealsByArea(area) {
  const url = `www.themealdb.com/api/json/v1/1/search.php?a=${area}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return err;
  }
}

async function fetchMealsByMainIngredient(mainIngredient) {
  const url = `www.themealdb.com/api/json/v1/1/search.php?i=${mainIngredient}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return err;
  }
}

async function fetchMealDetailsById(id) {
  const url = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return err;
  }
}

async function fetchRandomMeal() {
  const url = 'www.themealdb.com/api/json/v1/1/random.php';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return err;
  }
}

async function fetchAllMealCategories() {
  const url = 'www.themealdb.com/api/json/v1/1/categories.php';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.categories;
  } catch (err) {
    return err;
  }
}

export default {
  fetchMealByName,
  fetchMealsByMainIngredient,
  fetchMealsByArea,
  fetchMealsByCategory,
  fetchRandomMeal,
  fetchMealDetailsById,
  fetchAllMealCategories,
};
