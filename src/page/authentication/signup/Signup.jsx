import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSignup } from '../../../api-call/api-index';
import '../Authentication.css';
import { useToken } from '../../../context/context-index';
import { checkemail, checkpassword } from '../../../utilities/utilities-index';
import { useError } from '../../../reducer/useError';
import { useDocumentTitle } from '../../../hook/useDocumentTilte';
export const Signup = () => {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { setToken } = useToken();
  const [showPassword, setShowPassword] = useState({
    passwordShow: false,
    confirmPasswordShow: false,
  });
  const navigate = useNavigate();

  const [error, errorDispatch] = useError();

  const { emailError, passwordError, confirmPasswordError } = error;

  const handleShowPassword = ({ target: { id } }) => {
    if (id === 'password-show')
      setShowPassword({
        ...showPassword,
        passwordShow: !showPassword.passwordShow,
      });
    if (id === 'confirm-password-show') {
      setShowPassword({
        ...showPassword,
        confirmPasswordShow: !showPassword.confirmPasswordShow,
      });
    }
  };

  const handleEmail = (e) => {
    if (checkemail(e.target.value)) {
      setUser({ ...user, email: e.target.value });
      errorDispatch({ type: 'EMAIL_ERROR', payload: '' });
      return;
    }
    errorDispatch({ type: 'EMAIL_ERROR', payload: 'Input valid email' });
    setUser({ ...user, email: '' });
  };

  const handlePassword = (e) => {
    if (checkpassword(e.target.value)) {
      setUser({ ...user, password: e.target.value });
      errorDispatch({ type: 'PASSWORD_ERROR', payload: '' });
      return;
    }
    errorDispatch({ type: 'PASSWORD_ERROR', payload: 'Password must contains letters and numbers' });
    setUser({ ...user, password: '' });
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value === user.password) {
      setUser({ ...user, confirmPassword: e.target.value });
      errorDispatch({ type: 'CONFIRM_PASSWORD_ERROR', payload: '' });
      return true
    }

    errorDispatch({
      type: 'CONFIRM_PASSWORD_ERROR',
      payload: "Password don't match",
    });
    setUser({ ...user, confirmPassword: '' });
    return false
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      user.fullname.length === 0 ||
      user.email.length === 0 ||
      user.password.length === 0 ||
      user.confirmPassword.length === 0
    ) {
      return;
    }
    if(user.confirmPassword !== user.password){
      errorDispatch({
        type: 'CONFIRM_PASSWORD_ERROR',
        payload: "Password don't match",
      });
      return;
    }
    const response = await postSignup(user.fullname, user.email, user.password);
    if (response.status === 201) {
      localStorage.setItem('token', response.data.encodedToken);
      setToken(localStorage.getItem('token'));
      navigate('/', { replace: true });
    }
  };
  useDocumentTitle('Sign Up | Take Notes');
  return (
    <main className="authentication-body">
      <form action="" className="form-container signup-container">
        <h2 className="form-head text-center">Sign Up</h2>
        <div className="form-inputs">
          <div className="input-container">
            <label htmlFor="fullname">Full Name</label>
            <input
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              id="fullname"
              className="textbox"
              type="text"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">
              Email<span className="error-msg"> {emailError}</span>
            </label>
            <input
              placeholder="something@something.com"
              onChange={handleEmail}
              id="email"
              className="textbox"
              type="email"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">
              Password<span className="error-msg"> {passwordError}</span>
            </label>
            <input
              onChange={handlePassword}
              placeholder="must contain letters and numbers"
              id="password"
              className="textbox"
              type={showPassword.passwordShow ? 'text' : 'password'}
              required
            />
            <span
              id="password-show"
              onClick={handleShowPassword}
              className={`fa-solid ${
                showPassword.passwordShow ? 'fa-eye' : 'fa-eye-slash'
              } password-eye-icon`}
            ></span>
          </div>
          <div className="input-container">
            <label htmlFor="confirm-password">
              Confirm Password{' '}
              <span className="error-msg">{confirmPasswordError}</span>
            </label>
            <input
              id="confirm-password"
              className="textbox"
              type={showPassword.confirmPasswordShow ? 'text' : 'password'}
              onChange={handleConfirmPassword}
            />
            <span
              onClick={handleShowPassword}
              id="confirm-password-show"
              className={`fa-solid ${
                showPassword.confirmPasswordShow ? 'fa-eye' : 'fa-eye-slash'
              } password-eye-icon confirm-password-eye`}
            ></span>
          </div>
          <div className="input-container remember-me-container">
            <div>
              <label htmlFor="remember-me">
                <input type="checkbox" id="remember-me" />
                Remember me
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary form-sign-up-btn authenticate-btn"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <p className="small-text terms-condition">
            By signing up you agree to our{' '}
            <span className="secondary-text-color term-condtn-link">
              terms and conditions
            </span>
          </p>

          <p className="small-text have-account-condition text-center muted-text-color">
            Already have an account ? <span> </span>
            <Link to="/login" className="secondary-text-color form-login-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};
