import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/exploreByNationality.css';

function NationalityCard({ recipe, index, type }) {
  const name = recipe[`str${type}`];
  const imgUrl = recipe[`str${type}Thumb`];
  const id = recipe[`id${type}`];

  return (
    <div className="card-container" data-testid={ `${index}-recipe-card` }>
      <Link to={ `/${type === 'Drink' ? 'drinks' : 'foods'}/${id}` }>
        <img
          className="card-image"
          src={ imgUrl }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <h1 className="card-h1" data-testid={ `${index}-card-name` }>{name}</h1>
      </Link>
    </div>
  );
}

NationalityCard.propTypes = {
  recipe: PropTypes.objectOf(string).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default NationalityCard;
