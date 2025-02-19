import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", { username, password });

      if (response.status === 200) {
        console.log(response.data.message);
        navigate("/todo");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow-lg text-center"
        style={{ width: "400px", background: "rgba(255, 255, 255, 0.9)", borderRadius: "15px" }}
      >
        <h2 className="mb-4">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </motion.button>
        </form>

        {/* Signup & Forgot Password Links */}
        <div className="mt-3">
          <p>
            Don't have an account? <a href="#" className="text-decoration-none">Sign Up</a>
          </p>
          <p>
            <a href="#" className="text-decoration-none">Forgot Password?</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
