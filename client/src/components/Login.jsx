import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });

      const { jwt, user } = response.data;
      setSuccess(`Welcome, ${user.username}!`);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('token', jwt); // Save token for future auth use
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>  
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
          />
        <button type="submit" className={styles.button}>Login</button>
        <p>not registered yet!!! <Link to='/signup'>Register</Link> </p>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  </>
  );
};

export default Login;
