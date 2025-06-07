import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return typeof localStorage !== "undefined" && localStorage.getItem("user") !== null;
  });

  useEffect(() => {
    if (isLoggedIn) {
      setUserRole(getRoleFromToken());
    }
  }, [isLoggedIn]);

  const login = async (credentials) => {
    const response = await axiosInstance.post("/login", credentials, {
      headers: {
        skip: "true",
      },
    });

    const token = response.data.accessToken || response.data.token;
    if (token) {
      localStorage.setItem("user", token);
      setIsLoggedIn(true);
      setUserRole(getRoleFromToken());
    }

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const getRoleFromToken = () => {
    try {
      const token = localStorage.getItem("user");
      if (token) {
        const decoded = jwtDecode(token);
        return decoded?.role?.[0]?.authority || null;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const [userRole, setUserRole] = useState(() => getRoleFromToken());

  const getUserInfo = () => {
    try {
      const token = localStorage.getItem("user");
      if (token) {
        return jwtDecode(token);
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        login,
        logout,
        isLoggedIn,
        getUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
