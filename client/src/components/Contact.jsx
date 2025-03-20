import React from 'react'
import Navbar from './Navbar'
import styles from '../styles/Contact.module.css'
import Footer from './Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Contact = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    message: '',
  })
  const navigate = useNavigate();
  const handlechange = (e) => {
    setUser((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
    console.log(user);
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_CONTACT_URL
    try {
      const res = await axios.post(apiUrl, user);
      alert("thanks for connecting")
      navigate('/');
    }
    catch (err) {
      alert("use correct credentials")
      console.log(err);
    }
  }
  return (
    <>
      <Navbar />
      <h1 className={styles.heading}>Contact Us</h1>
      <div className={styles.main}>
        <div action="" className={styles.form}>
          <div className={styles.detail}>
            <label htmlFor="name" className={styles.label}>Name : </label>
            <input type="text" name='name' id='name' placeholder='John Doe' className={styles.field} onChange={handlechange} />

          </div>
          <div className={styles.detail}>
            <label htmlFor="email" className={styles.label}>Email Id :</label>
            <input type="email" name='email' id='email' placeholder='abc@gmail.com' className={styles.field} onChange={handlechange} />
          </div>
          <div className={styles.detail}>
            <label htmlFor="message" className={styles.label}>Your Message : </label>
            <textarea name="message" id="message" placeholder='Enter your message' className={styles.textarea} onChange={handlechange}></textarea>
          </div>
        </div>
        <div className={styles.sub}>
          <div className={styles.submit} onClick={handlesubmit}>submit your response</div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact