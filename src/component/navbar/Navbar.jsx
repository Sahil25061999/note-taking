import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  useToken,
  useDeleteList,
  useArchivesList,
} from '../../context/context-index';
import { SearchBar } from '../component-index';
import './Navbar.css';

export const Navbar = () => {
  const [hideNav, setHideNav] = useState(true);
  const { token, setToken } = useToken();
  const { setDeleteList, deleteList } = useDeleteList();
  const { setArchiveList, archivesList } = useArchivesList();

  const archiveLength = archivesList.length;
  const location = useLocation();

  const handleLogout = () => {
    setToken(localStorage.clear());
    setDeleteList([]);
    setArchiveList([]);
  };
  useEffect(() => {
    setHideNav(true);
  }, [location]);

  return (
    <>
      <header className="navbar home-navbar">
        <div className="logo-container">
          <h2>
            <NavLink to="/">Take Notes</NavLink>
          </h2>
        </div>
        <button
          className="navbar-link btn hamburger-btn"
          onClick={() => setHideNav(!hideNav)}
        >
          <span
            className={`fa-solid ${hideNav ? 'fa-bars' : 'fa-xmark'}`}
          ></span>
        </button>
        {/* <SearchBar /> */}
        <nav className="navbar-menu" data-hidden={hideNav}>
          <ul className="navbar-list list-style-none">
            {token ? (
              <>
                <li className="navbar-items">
                  <NavLink to="/" className="btn btn-link sidebar-items">
                    <span className="fa-solid fa-house"></span>{' '}
                    <span className="sidebar-link-text">Home</span>
                  </NavLink>
                </li>
                <li className="navbar-items">
                  <NavLink to="/label" className="btn btn-link sidebar-items">
                    <span className="fa-solid fa-tag"></span>{' '}
                    <span className="sidebar-link-text">Label</span>
                  </NavLink>
                </li>
                <li className="navbar-items">
                  <NavLink to="/archive" className="btn btn-link sidebar-items">
                    <span className="fa-solid fa-box-archive"></span>{' '}
                    <span className="sidebar-link-text">
                      Archive
                      {archiveLength !== 0 && (
                        <span className=" badge-text badge-notify">
                          {archiveLength}
                        </span>
                      )}
                    </span>
                  </NavLink>
                </li>
                <li className="navbar-items">
                  <NavLink to="/trash" className="btn btn-link sidebar-items">
                    <span className="fa-solid fa-trash"></span>{' '}
                    <span className="sidebar-link-text">
                      Trash
                      {deleteList.length !== 0 && (
                        <span className=" badge-text badge-notify">
                          {deleteList.length}
                        </span>
                      )}
                    </span>
                  </NavLink>
                </li>

                <li className="navbar-items logout-btn">
                  <Link
                    onClick={handleLogout}
                    to="/signup"
                    className="btn navbar-link "
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-items ">
                  <NavLink to="/login" className="navbar-link btn btn-black ">
                    Login
                  </NavLink>
                </li>
                <li className="navbar-items ">
                  <NavLink to="/signup" className="navbar-link btn btn-black">
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
