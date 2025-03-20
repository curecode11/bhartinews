import React from 'react'
import Navbar from './Navbar'
import styles from '../styles/About.module.css'
const About = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>About Bharti News</h1>
        <p className={styles.description}>
          Welcome to <strong>Bharti News</strong>, your trusted source for the latest and most reliable news.
          We are committed to providing accurate, unbiased, and up-to-date information across a variety of categories including politics, technology, entertainment, sports, and more.
        </p>
        <h2 className={styles.subheading}>Our Mission</h2>
        <p className={styles.text}>
          At Bharti News, our mission is to empower readers with factual and insightful news that keeps them informed and engaged.
          We strive to uphold journalistic integrity and ensure transparency in our reporting.
        </p>
        <h2 className={styles.subheading}>Why Choose Us?</h2>
        <ul className={styles.list}>
          <li>Accurate and well-researched news</li>
          <li>Timely updates on current affairs</li>
          <li>Coverage across multiple categories</li>
          <li>Unbiased and independent journalism</li>
        </ul>
        <h2 className={styles.subheading}>Contact Us</h2>
        <p className={styles.text}>
          Have any questions or feedback? Reach out to us at <strong>contact@bhartinews.com</strong>.
        </p>
      </div>

    </>
  )
}

export default About