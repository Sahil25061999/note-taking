import React from 'react';
import { NavLink } from 'react-router-dom';
import { useArchivesList, useDeleteList } from '../../context/context-index';
import './SideNav.css';

export const SideNav = () => {
  const { archivesList } = useArchivesList();
  const { deleteList } = useDeleteList();
  const archiveLength = archivesList.length;
  return (
    <nav className="sidebar">
      <NavLink to="/" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-house"></span>{' '}
        <span className="sidebar-link-text">Home</span>
      </NavLink>
      <NavLink to="/label" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-hashtag"></span>{' '}
        <span className="sidebar-link-text">Label</span>
      </NavLink>
      <NavLink to="/archive" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-box-archive"></span>{' '}
        <span className="sidebar-link-text">
          Archive
          {archiveLength !== 0 && (
            <span className=" badge-text badge-notify">{archiveLength}</span>
          )}
        </span>
      </NavLink>
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
      <NavLink to="/profile" className="btn btn-link sidebar-items">
        <span className="fa-solid fa-user"></span>
        {'  '}
        <span className="sidebar-link-text">Profile</span>
      </NavLink>
    </nav>
  );
};
