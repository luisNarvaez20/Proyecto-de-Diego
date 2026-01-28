"use client"
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const loginUser = (authToken) => {
    const data = jwtDecode(authToken);
    setToken(authToken);
    setRole(data.role);

    localStorage.setItem("token", authToken);
    localStorage.setItem("rol", data.role);
  };

  const logoutUser = () => {
    setToken(null);
    setRole(null);

    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ role, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};