import React, { useState, useEffect } from 'react';
import '../Authentication.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useToken } from '../../../context/context-index';
import { postLogin } from '../../../api-call/api-index';
import { useError } from '../../../reducer/useError';

export const Login = () => {
  const [user, setUser] = useState({
    loginEmail: '',
    loginPassword: '',
  });
  const [error, errorDispatch] = useError();
  const { emailError, passwordError } = error;
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await postLogin(user.loginEmail, user.loginPassword);
    if (response.status === 404) {
      errorDispatch({
        type: 'EMAIL_ERROR',
        payload: 'email doesnt exist',
      });
      return;
    }
    if (!Object.keys(response.data).length) {
      errorDispatch({ type: 'PASSWORD_ERROR', payload: 'check password' });
    }
    if (response.data.encodedToken) {
      localStorage.setItem('token', response.data.encodedToken);
      setToken(localStorage.getItem('token'));
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <main className="authentication-body">
      <form action="" className="form-container login-container">
        <h2 className="form-head text-center">Log In</h2>

        <div className="form-inputs">
          <div className="input-container">
            <label htmlFor="email">
              Email <span className="text-center error-msg">{emailError}</span>
            </label>
            <input
              id="email"
              className="textbox"
              type="email"
              onChange={(e) => setUser({ ...user, loginEmail: e.target.value })}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">
              Password{' '}
              <span className="text-center error-msg">{passwordError}</span>
            </label>
            <input
              id="password"
              className="textbox"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) =>
                setUser({ ...user, loginPassword: e.target.value })
              }
            />

            <span
              onClick={handleShowPassword}
              className={`fa-solid ${
                showPassword ? 'fa-eye' : 'fa-eye-slash'
              } password-eye-icon`}
            ></span>
          </div>
          <div className="input-container remember-me-container">
            <div>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <span className="small-text secondary-text-color forgot-pwd-link">
              forgot password ?
            </span>
          </div>
          <button
            className="btn btn-primary form-log-in-btn authenticate-btn"
            onClick={handleLogin}
          >
            Log In
          </button>

          <p className="small-text no-account-condition text-center muted-text-color">
            Don't have an account ?
            <Link
              to="/signup"
              className="secondary-text-color form-signup-link"
            >
              {' '}
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};
