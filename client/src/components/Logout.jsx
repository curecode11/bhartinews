import React from 'react'
import Navbar from './Navbar'
import styles from '../styles/Logout.module.css'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username;
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        navigate('/login');
    };
  return (
    <>
        <Navbar/>
        <div className={styles.container}>
        <p>Are you sure <b> {username}</b>, to continue press the button below</p>
        <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
        </div>
    </>
  )
}

export default Logout