import { useState } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/login", formData);
      if (res.data.success) {
        navigate("/dashboard");  // Redirect on successful login
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>

        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.options}>
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="/forgot-password" className={styles.forgot}>Forgot Password?</a>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>Login</button>

        <p className={styles.signup}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
    </>
  );
};

export default Login;
