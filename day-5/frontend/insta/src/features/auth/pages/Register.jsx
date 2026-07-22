

import React, { useState } from "react";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

const Register = () => {
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const success = await handleRegister(username, email, password);

    if (success) {
      console.log("User Registered Successfully");
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      <main>
        <h1 className="text-3xl mb-5">Register</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 min-w-xl p-3"
        >
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-3xl bg-white text-black"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-lg">
            Already have an account?{" "}
            <Link className="text-red-600" to="/login">
              Login
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;