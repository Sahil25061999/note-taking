import React, { useContext, createContext } from 'react';
import { useState, useEffect } from 'react';

const TokenContext = createContext(null);

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const tokenFromLocal = localStorage.getItem('token');
    setToken(()=>tokenFromLocal);
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

const useToken = () => useContext(TokenContext);

export { useToken, TokenProvider };
