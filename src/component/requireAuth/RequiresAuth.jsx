import React from 'react';
import { useToken } from '../../context/context-index';
import { Navigate, useLocation } from 'react-router-dom';

export const RequiresAuth = ({ children }) => {
  const { token } = useToken();
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate state={{ from: location }} to="/signup" replace />
  );
};
