import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/footer.css';
import '../css/explore.css';

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="exploreContainer">
      <Header title="Explore" />
      <div className="exploreNavButtonsContainer">
        <button
          data-testid="explore-foods"
          onClick={ () => navigate('/explore/foods') }
          type="button"
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          onClick={ () => navigate('/explore/drinks') }
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
