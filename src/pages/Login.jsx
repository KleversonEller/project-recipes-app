/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { useDispatch } from 'react-redux';
import { saveEmail } from '../actions';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate('/foods');
  };

  const checkInfo = () => {
    const six = 6;
    if ((password.length > six) && (/\S+@\S+\.\S+/.test(email))) {
      setIsDisabled(false);
      dispatch(saveEmail(email));
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('cocktailsToken', JSON.stringify(1));
      localStorage.setItem('doneRecipes', JSON.stringify([{}]));
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    if (password && (/\S+@\S+\.\S+/.test(email))) {
      checkInfo();
    }
  }, [password]);

  return (
    <div className="container">
      <div className="loginContainer">
        <h1>Login</h1>
        <input
          type="email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          placeholder="Digite seu email"
          name="user"
          data-testid="email-input"
        />
        <input
          type="password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          placeholder="Digite a senha"
          name="password"
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ handleClick }
          disabled={ isDisabled }
          data-testid="login-submit-btn"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
