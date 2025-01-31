import React from 'react'
import styles from '../styles/Footer.module.css'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.left}>
            <center><b>Important Links</b></center>
            <ul className={styles.leftContent}>
              <a className={styles.leftLink} href="">Bharati News</a>
              <a className={styles.leftLink} href="">Bharati News</a>
              <a className={styles.leftLink} href="">Bharati News</a>
              <a className={styles.leftLink} href="">Bharati News</a>
              <a className={styles.leftLink} href="">Bharati News</a>
            </ul>
          </div>
          <div className={styles.mid}>
            <center><b>Important Links</b></center>
            <ul className={styles.midContent}>
              <a className={styles.midLink} href="">Bharati News</a>
              <a className={styles.midLink} href="">Bharati News</a>
              <a className={styles.midLink} href="">Bharati News</a>
              <a className={styles.midLink} href="">Bharati News</a>
              <a className={styles.midLink} href="">Bharati News</a>
            </ul>
          </div>
          <div className={styles.right}>
            <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.472684945088!2d77.11066807457458!3d28.675503682129722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d038b9232e7cd%3A0x34ebc68df4428491!2sBharati%20Vidyapeeth's%20Institute%20of%20Computer%20Applications%20and%20Management%20(BVICAM)!5e0!3m2!1sen!2sin!4v1738215090434!5m2!1sen!2sin" width={800} height={600} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <div className={styles.partners}>
          <img className={styles.partnerImage} src="bharatiTimes.png" alt="" />
          <img className={styles.partnerImage} src="bharatiNetwork.png" alt="" />
          <img className={styles.partnerImage} src="radioBharati.png" alt="" />
          <img className={styles.partnerImage} src="manzil.png" alt="" />
        </div>
      </div>
    </>
  )
}

export default Footer