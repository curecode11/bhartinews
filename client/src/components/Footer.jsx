import React from 'react'
import styles from '../styles/Footer.module.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.mid}>
            <ul className={styles.midContent}>
              <center><b>Social Media</b></center>
              <a className={styles.midLink} href=""><img src="/facebook.png" alt="img"/>Facebook</a>
              <a className={styles.midLink} href=""><img src="/instagram.png" alt="img"/>Instagram</a>
              <a className={styles.midLink} href=""><img src="/youtube.png" alt="img"/>Youtube</a>
              <a className={styles.midLink} href=""><img src="/linkedin.png" alt="img"/>Linkedin</a>

            </ul>
            <ul className={styles.midContent}>
              <center><b>Important Links</b></center>
              <Link to='/contact' className={styles.midLink}><a className={styles.midLink} href="">Contact Us</a></Link>
              <Link to='/about' className={styles.midLink}><a className={styles.midLink} href="">About Us</a></Link>
              <a className={styles.midLink} href="http://bvicam.in/Home/NIRF">NIRF Data</a>
              <a className={styles.midLink} href="http://localhost:1337/admin/">Admin Login</a>
              <a className={styles.midLink} href="http://www.ipu.ac.in/">GGSIPU</a>
              
            </ul>
          </div>
          <div className={styles.right}>
            <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.472684945088!2d77.11066807457458!3d28.675503682129722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d038b9232e7cd%3A0x34ebc68df4428491!2sBharati%20Vidyapeeth's%20Institute%20of%20Computer%20Applications%20and%20Management%20(BVICAM)!5e0!3m2!1sen!2sin!4v1738215090434!5m2!1sen!2sin" width={800} height={600} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
          <div>
            <img className={styles.qrLinks} src="/qr.png" alt="" />
          </div>
        <center className={styles.copyright}>Copyright © 2025 Bharati News BVICAM</center>
      </div>
    </>
  )
}

export default Footer