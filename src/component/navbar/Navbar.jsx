import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  useToken,
  useDeleteList,
  useArchivesList,
} from '../../context/context-index';
import { SearchBar } from '../component-index';
import './Navbar.css';

export const Navbar = () => {
  const { token, setToken } = useToken();
  const { setDeleteList } = useDeleteList();
  const { setArchiveList } = useArchivesList();
  const location = useLocation();
  const handleLogout = () => {
    setToken(localStorage.clear());
    setDeleteList([]);
    setArchiveList([]);
  };
  console.log(location);
  return (
    <>
      <header className="navbar home-navbar">
        <div className="logo-container">
          <h2>
            <NavLink to="/">Take Notes</NavLink>
          </h2>
        </div>
        {/* <SearchBar /> */}
        <nav className="navbar-menu">
          <ul className="navbar-list list-style-none">
            {token ? (
              <li className="navbar-item">
                <Link
                  onClick={handleLogout}
                  to="/signup"
                  className="btn navbar-link btn-black"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="navbar-item">
                  <NavLink to="/login" className="navbar-link btn btn-black">
                    Login
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink to="/signup" className="navbar-link btn btn-black">
                    Sign up
                  </NavLink>
                </li>
              </>
            )}

            <li className="navbar-item hamburger-icon">
              <a href="#" className="navbar-link btn">
                <span className="fa-solid fa-bars"></span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
