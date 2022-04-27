import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import NotFound from './pages/NotFound';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import store from './store';
import FoodRecipeDetails from './pages/FoodRecipeDetails';
import DrinkRecipeDetails from './pages/DrinkRecipeDetails';
import FoodRecipeInProgress from './pages/FoodRecipeInProgress';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';

function App() {
  return (
    <div className="meals">
      <Provider store={ store }>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={ <Login /> }
            />
            <Route
              path="/foods"
              element={ <Foods /> }
            />
            <Route
              path="/drinks"
              element={ <Drinks /> }
            />
            <Route
              path="/foods/:id"
              element={ <FoodRecipeDetails /> }
            />
            <Route
              path="/drinks/:id"
              element={ <DrinkRecipeDetails /> }
            />
            <Route
              path="/foods/:id/in-progress"
              element={ <FoodRecipeInProgress /> }
            />
            <Route
              path="/drinks/:id/in-progress"
              element={ <DrinkRecipeInProgress /> }
            />
            <Route
              path="/explore"
              element={ <Explore /> }
            />
            <Route
              path="/explore/foods"
              element={ <ExploreFoods /> }
            />
            <Route
              path="/explore/drinks"
              element={ <ExploreDrinks /> }
            />
            <Route
              path="/explore/foods/ingredients"
              element={ <ExploreFoodsIngredients /> }
            />
            <Route
              path="/explore/drinks/ingredients"
              element={ <ExploreDrinksIngredients /> }
            />
            <Route
              path="/explore/foods/nationalities"
              element={ <ExploreFoodsNationalities /> }
            />
            <Route
              path="/profile"
              element={ <Profile /> }
            />
            <Route
              path="/done-recipes"
              element={ <DoneRecipes /> }
            />
            <Route
              path="/favorite-recipes"
              element={ <FavoriteRecipes /> }
            />
            <Route
              path="*"
              element={ <NotFound /> }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
