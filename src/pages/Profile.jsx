/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userLogout from '../utils/index';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/profile.css';

const Profile = () => {
  const { userEmail } = useSelector((state) => state?.user);
  const email = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleClick = (location) => {
    navigate(location);
  };

  useEffect(() => {
    if (email === null) {
      localStorage.setItem('user', JSON.stringify({ email: userEmail }));
      setUser(userEmail);
    } else {
      setUser(email.email);
    }
    console.log(email);
  }, []);

  return (
    <div className="profileContainer">
      <div className="profileHeaderContainer">
        <Header title="Profile" />
        <h3 data-testid="profile-email">{user}</h3>
        <div className="profileNavButtonsContainer">
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
      </div>
      <Footer />

    </div>
  );
};

export default Profile;
