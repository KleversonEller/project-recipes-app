import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

const DoneRecipe = (props) => {
  const navigate = useNavigate();
  const { disabled, food, type } = props;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const day = today.toDateString();

  const saveLocal = (done) => {
    const local = JSON.parse(localStorage.getItem(('doneRecipes')));
    // console.log(local);
    if (!local || local.lenght === 0 || local === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([done]));
    } else if (local || local.lenght > 0) {
      localStorage.setItem('doneRecipes', JSON.stringify([...local, done]));
    } else {
      const except = local.filter((item) => (item.id !== id));
      localStorage.setItem('doneRecipes', JSON.stringify([...except]));
    }
  };

  const addFavorite = () => {
    let done;
    if (type === 'food') {
      done = {
        id: food.idMeal,
        type: 'food',
        nationality: food.strArea,
        category: food.strCategory,
        name: food.strMeal,
        image: food.strMealThumb,
        tags: [food.strTags],
        doneDate: day,
      };
      saveLocal(done);
      navigate('/done-recipes');
    } else if (type === 'drink') {
      done = {
        id: food.idDrink,
        type: 'drink',
        nationality: '',
        category: food.strCategory,
        alcoholicOrNot: food.strAlcoholic,
        name: food.strDrink,
        image: food.strDrinkThumb,
        tags: food.strTags,
        doneDate: day,
      };
      saveLocal(done);
      navigate('/done-recipes');
    }
  };

  /*
  const verifyDone = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    let sameId;
    if (local) {
      sameId = local.find((item) => (item.id === id));
    }
    if (sameId) {
      console.log('esconde botão');
    }
  };

  useEffect(() => {
    verifyDone();
  }, []);
  */

  return (
    <div className="botaoteste">
      <button
        type="button"
        disabled={ disabled }
        onClick={ addFavorite }
      >
        teste
      </button>
    </div>
  );
};

DoneRecipe.propTypes = {
  disabled: PropTypes.string,
}.isRequired;

export default DoneRecipe;
