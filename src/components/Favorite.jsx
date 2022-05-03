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
  const { food } = props;
  const { href } = window.location;
  // console.log(food);
  const copyRecipe = () => {
    const time = 2000;
    const copy = clipboardCopy;
    copy(href);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    }, time);
  };

  const addFavorite = () => {
    setHeartColor(!heartColor);
    const favoriteFood = {
      id: food.idMeal,
      type: 'food',
      nationality: food.strArea,
      category: food.strCategory,
      alcoholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
    };
    const local = JSON.parse(localStorage.getItem(('favoriteRecipes')));
    if (!local || local.lenght === 0 || local === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteFood]));
    } else if (!heartColor === true) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, favoriteFood]));
    } else {
      const except = local.filter((item) => (item.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...except]));
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
