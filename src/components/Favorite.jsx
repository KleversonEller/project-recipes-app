import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const Favorite = (props) => {
  const { id } = useParams();
  const [copied, setCopied] = useState();
  const [heartColor, setHeartColor] = useState(false);
  const { food, type } = props;
  const { href } = window.location;
  // console.log(food, type);
  const copyRecipe = () => {
    const five = 5;
    const time = 2000;
    const copy = clipboardCopy;
    const hrefRecipe = href.split('/').slice(0, five).join('/');
    copy(hrefRecipe);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    }, time);
  };

  const saveLocal = (favorite) => {
    const local = JSON.parse(localStorage.getItem(('favoriteRecipes')));
    if (!local || local.lenght === 0 || local === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
    } else if (!heartColor === true) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, favorite]));
    } else {
      const except = local.filter((item) => (item.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...except]));
    }
  };

  const addFavorite = () => {
    setHeartColor(!heartColor);
    let favorite;
    if (type === 'food') {
      favorite = {
        id: food.idMeal,
        type: 'food',
        nationality: food.strArea,
        category: food.strCategory,
        alcoholicOrNot: '',
        name: food.strMeal,
        image: food.strMealThumb,
      };
      saveLocal(favorite);
    } else if (type === 'drink') {
      favorite = {
        id: food.idDrink,
        type: 'drink',
        nationality: '',
        category: food.strCategory,
        alcoholicOrNot: food.strAlcoholic,
        name: food.strDrink,
        image: food.strDrinkThumb,
      };
      saveLocal(favorite);
    }
  };

  const verifyFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let sameId;
    if (local) {
      sameId = local.find((item) => (item.id === id));
    }
    if (sameId) {
      setHeartColor(true);
    }
  };

  useEffect(() => {
    verifyFavorite();
  }, []);

  return (
    <div>
      <div className="iconsContainer">
        <button
          type="button"
          onClick={ copyRecipe }
        >
          <img
            className="foodRecipeDetailsIcon"
            src={ shareIcon }
            alt="share-button"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          onClick={ addFavorite }
        >
          <img
            className="foodRecipeDetailsIcon"
            src={ heartColor ? blackHeartIcon : heart }
            alt="heart-button"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <div className="linkCopiedContainer">
        {copied && <p>{ copied }</p> }
      </div>
    </div>
  );
};

Favorite.propTypes = {
  food: PropTypes.object,
}.isRequired;

export default Favorite;
