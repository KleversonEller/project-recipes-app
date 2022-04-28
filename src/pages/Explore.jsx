import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/footer.css';
import '../css/explore.css';

const Explore = () => {
  const navigate = useNavigate();
  const handleClick = (location) => {
    navigate(location);
  };
  return (
    <div className="exploreContainer">
      <Header title="Explore" />
      <div className="exploreNavButtonsContainer">
        <button
          data-testid="explore-foods"
          onClick={ () => handleClick('/explore/foods') }
          type="button"
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          onClick={ () => handleClick('/explore/drinks') }
          type="button"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
