import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Cards = ({ page }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = () => {
      const Url = 'https://img.itdg.com.br/tdg/images/blog/uploads/2017/07/shutterstock_413580649.jpg?w=1200';
      switch (page) {
      case 'food':
        return setList([
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
          { imagen: Url, title: 'food' },
        ]);
      case 'drink':
        return setList([
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
          { imagen: Url, title: 'drink' },
        ]);
      default:
        return setList(['Sorry, we haven\'t found any recipes for these filters.']);
      }
    };
    getList();
  }, []);
  console.log('ola');
  return (
    <div>
      {list.length > 1 ? (
        list.map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ food.imagen }
              width="200px"
              alt={ `Ilustração de ${food.title}` }
            />
            <span data-testid={ `${index}-card-name` }>
              {food.title}
            </span>
          </div>
        )))
        : (
          <alert>
            { list[0] }
          </alert>)}
    </div>
  );
};

Cards.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Cards;
