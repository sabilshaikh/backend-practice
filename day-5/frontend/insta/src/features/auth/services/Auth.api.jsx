


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

// Login
export const login = async (userData, password) => {
    console.log("login call hua");
    
  const response = await api.post("/login", {
    userData,
    password,
  });

  return response.data;
};

// Register
export const register = async (username, email, password) => {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
};

// Get Current User
export const getMe = async () => {
  const response = await api.get("/get-me");

  return response.data;
};