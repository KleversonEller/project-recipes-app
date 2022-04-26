import React from 'react';
import { useHistory } from 'react-router-dom';
import userLogout from '../utils';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const handleClick = (location) => {
    history.push(location);
  };
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{email}</h3>
      <button
        onClick={ () => handleClick('/done-recipes') }
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        onClick={ () => handleClick('/favorite-recipes') }
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        onClick={ () => { handleClick('/'); userLogout(); } }
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
