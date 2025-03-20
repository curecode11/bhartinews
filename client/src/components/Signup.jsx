import { useState } from "react";
import axios from "axios";
import styles from "../styles/Signup.module.css";
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/signup", formData);
      if (res.data.success) {
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to signup. Please try again.");
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Sign Up</h2>

        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.button}>Sign Up</button>

        <p className={styles.login}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
    </>
  );
};

export default Signup;
