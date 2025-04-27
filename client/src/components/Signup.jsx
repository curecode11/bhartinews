import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Signup.module.css';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1337/api/auth/local/register', formData);
      setMessage('Signup successful!');
      console.log('User registered:', res.data);
    } catch (err) {
      console.error('Error signing up:', err);
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Signup</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Sign Up</button>
          <p>already registered <Link to='/login'>Login</Link> </p>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </>
  );
};

export default Signup;
