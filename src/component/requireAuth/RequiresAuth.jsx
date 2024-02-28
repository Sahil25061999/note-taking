import React, { useEffect, useState } from "react";
import { useToken } from "../../context/context-index";
import { Navigate, useLocation } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const { token } = useToken();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [token]);

  if (loading) {
    return null;
  }

  return token ? (
    children
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
};
