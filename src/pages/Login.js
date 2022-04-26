import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/login.css';

function Login() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const handleClick = () => {
    history.push('/foods');
  };

  const handleUser = ({ target }) => {
    setUser(target.value);
  };
  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const checkInfo = () => {
    const six = 6;
    if ((password.length > six) && (/\S+@\S+\.\S+/.test(user))) {
      setIsDisabled(false);
      localStorage.setItem('user', JSON.stringify({ email: user }));
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('cocktailsToken', JSON.stringify(1));
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    if (password && (/\S+@\S+\.\S+/.test(user))) {
      checkInfo();
    }
  }, [password]);

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <input
        type="email"
        onChange={ handleUser }
        placeholder="Digite seu Email"
        name="user"
        data-testid="email-input"
      />
      <input
        type="password"
        onChange={ handlePassword }
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
  );
}

export default Login;
