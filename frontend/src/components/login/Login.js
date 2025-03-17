import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import hospitalimage from "./hospitalimage.jpg";
import './Login.css'

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const validate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await AuthService.login(data.username, data.password);
      localStorage.setItem("token", JSON.stringify(response));

      navigate("/menu");
    } catch (err) {
      setError("❌ Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-card">
          <h2 className="text-center mb-4">Login</h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={validate}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
