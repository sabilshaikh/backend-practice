

import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { login, register, getMe } from "./services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const {
    user,
    setUser,
    loading,
    setLoading,
  } = context;

  // Login
  const handleLogin = async (userData, password) => {
    console.log("handle login call hua");
    
    try {
      setLoading(true);

      const response = await login(userData, password);

      setUser(response.user);

      return true;
    } catch (error) {
      console.error("Login Error:", error);

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const handleRegister = async (username, email, password) => {
    try {
      setLoading(true);

      const response = await register(username, email, password);

      setUser(response.user);

      return true;
    } catch (error) {
      console.error("Register Error:", error);

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get Current User
  const handleGetMe = async () => {
    try {
      setLoading(true);

      const response = await getMe();

      setUser(response.user);

      return response.user;
    } catch (error) {
      console.error("GetMe Error:", error);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleGetMe,
  };
};