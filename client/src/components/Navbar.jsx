import { Link } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className={styles.main}>
        <ul className={styles.linkContainer}>
          <li className={styles.linkItem}><Link className={styles.link} to='/'><b>Bharati News</b></Link></li>
          <li className={styles.linkItem}><Link className={styles.link} to='/about'>About</Link></li>
          <li className={styles.linkItem}><Link className={styles.link} to='/contact'>Contact</Link></li>
          <li className={styles.linkItem}><Link className={styles.link} to='/latest'>Latest</Link></li>
          <li className={styles.linkItem}><Link className={styles.link} to='/login'>Login</Link></li>
          <li className={styles.linkItem}><Link className={styles.link} to='/signup'>Signup</Link></li>
        </ul>
      </div>
      <div className={`dropdown ${styles.mobileNav}`}>
        <button className={`btn text-light dropdown-toggle ${styles.menuBtn}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Menu
        </button>
        <ul className="dropdown-menu">
          <li><Link to='/'>Bharati News</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          <li><Link to='/latest'>Latest</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </ul>
      </div>


    </>
  )
}

export default Navbar