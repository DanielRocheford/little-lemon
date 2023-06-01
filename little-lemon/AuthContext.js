import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [AuserData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [AUserInitial, AsetUserInitial] = useState('');

  const updateData = (updatedData) => {
    setUserData(updatedData);
  };

  const updateLoginStatus = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <AuthContext.Provider
      value={{ AuserData, updateData, isLoggedIn, updateLoginStatus , AUserInitial, AsetUserInitial  }}
    >
      {children}
    </AuthContext.Provider>
  );
};
