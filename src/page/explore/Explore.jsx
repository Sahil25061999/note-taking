import React from 'react';
import { Link } from 'react-router-dom';
import './Explore.css';
export const Explore = () => {
  return (
    <main className="explore-page">
      <div>
        <p className="h2">Take Notes</p>
        <p>A unique, customizable note taking app</p>
        <Link to="/login">
          <button className="btn btn-black">Login </button>
        </Link>
      </div>
    </main>
  );
};
