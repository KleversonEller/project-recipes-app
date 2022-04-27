import React from 'react';
import { useNavigate } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import '../css/footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleDrinks = () => {
    navigate('/drinks');
  };
  const handleFoods = () => {
    navigate('/foods');
  };
  const handleExplore = () => {
    navigate('/explore');
  };
  return (
    <footer data-testid="footer" className="footerContainer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ handleDrinks }
      >
        <img src={ drinkIcon } alt="link drinks" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        src={ explore }
        onClick={ handleExplore }
      >
        <img src={ explore } alt="link-explore" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        src={ meal }
        onClick={ handleFoods }
      >
        <img src={ meal } alt="link-meal" />
      </button>

    </footer>

  );
};

export default Footer;
