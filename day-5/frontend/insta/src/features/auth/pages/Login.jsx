

import React, { useState } from "react";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [userData, setUserData] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handle submit call hua");
    
    // Basic Validation
    if (!userData || !password) {
      alert("Please fill all fields");
      return;
    }

    const success = await handleLogin(userData, password);

    if (success) {
      console.log("User Logged In Successfully");
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      <main>
        <h1 className="text-3xl mb-5">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 min-w-xl p-3"
        >
          <input
            type="text"
            placeholder="Enter username or email"
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            className="w-full p-3 rounded-3xl bg-white text-black"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-3xl bg-white text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-3xl bg-red-600 text-white text-xl disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="text-lg">
            Don't have an account?{" "}
            <Link className="text-red-600" to="/register">
              Create One
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;