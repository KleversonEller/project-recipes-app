import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/foods">
        <button type="button">Foods</button>
      </Link>
    </div>
  );
}

export default Login;
