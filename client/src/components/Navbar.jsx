import { Link } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const CMS_API=import.meta.env.VITE_CMS_API;
  useEffect(() => {

    try {
      const getMenu = async () => {
        const response = await axios.get(`${CMS_API}/api/leftmenus?populate=*`)
        setMenuItems(response.data.data);
      }
      getMenu();
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <>
      <div className={styles.page}>

        <div className={styles.brand}>
          <img className={styles.brandImage} src="/bharatiNews.png" alt="" />
          <img src="http://bharati-news.in//wp-content/uploads/2024/03/Bharati-News.png" className={styles.brandTitle} alt="" />
          {/* <div className={styles.imageBox}>
            <div className={styles.linkCont}>
              <img className={styles.linkImg} src="mag.png" alt="" />
              <center className={styles.imgTxt}>MANZIL</center>
            </div>
            <div className={styles.linkCont}>
              <img className={styles.linkImg} src="pen.png" alt="" />
              <center className={styles.imgTxt}>BHARATI TIMES</center>
            </div>
            <div className={styles.linkCont}>
            <img className={styles.linkImg} src="radio.png" alt="" />
            <center className={styles.imgTxt}>BHARATI RADIO</center>
            </div>
            </div> */}
          {/* <h1 className={styles.brandName}>BHARATI NEWS</h1> */}

          <img src="http://bvicam.in/Content/ForntEnd/images/logo.png" className={styles.brandImage} alt="" />
        </div>
        <div className={styles.main}>
          <ul className={styles.linkContainer}>
            <li className={styles.linkItem}><Link className={styles.link} to='/'><b>Home</b></Link></li>
            {/* <li className={styles.linkItem}><Link className={styles.link} to='/about'>About</Link></li>
            <li className={styles.linkItem}><Link className={styles.link} to='/contact'>Contact</Link></li> */}
            <li className={styles.linkItem}><Link className={styles.link} to='/latest'>Latest</Link></li>
            {
              menuItems.map((item) => (
                <li className={styles.linkItem} key={item.slug}><Link className={styles.link} to={`/leftmenus/${item.slug}`}>{item.name}</Link></li>
              ))
            }
            {
              token ? (
                <li className={styles.linkItem}><Link className={styles.link} to='/logout'>Logout</Link></li>
              ) : (
                <>
                  <li className={styles.linkItem}><Link className={styles.link} to='/login'>Login</Link></li>
                  <li className={styles.linkItem}><Link className={styles.link} to='/signup'>Signup</Link></li>
                </>
              )
            }
          </ul>
        </div>
      </div >
      <div className={`dropdown ${styles.mobileNav}`}>
        <div className={styles.brand}>
          <img className={styles.brandImage} src="/bharatiNews.png" alt="" />
          <img src="http://bharati-news.in//wp-content/uploads/2024/03/Bharati-News.png" className={styles.brandTitle} alt="" />
          {/* <div className={styles.imageBox}>
            <div className={styles.linkCont}>
              <img className={styles.linkImg} src="mag.png" alt="" />
              <center className={styles.imgTxt}>MANZIL</center>
            </div>
            <div className={styles.linkCont}>
              <img className={styles.linkImg} src="pen.png" alt="" />
              <center className={styles.imgTxt}>BHARATI TIMES</center>
            </div>
            <div className={styles.linkCont}>
            <img className={styles.linkImg} src="radio.png" alt="" />
            <center className={styles.imgTxt}>BHARATI RADIO</center>
            </div>
            </div> */}
          {/* <h1 className={styles.brandName}>BHARATI NEWS</h1> */}

          <img src="http://bvicam.in/Content/ForntEnd/images/logo.png" className={styles.brandImage} alt="" />
        </div>

        <img src="/bharatiNews.png" className={styles.mobilebrandImage} alt="" />
        <button className={`btn  dropdown-toggle ${styles.menuBtn}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Menu
        </button>
        <ul className={`dropdown-menu ${styles.mobileUl}`}>
          <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/'>Bharati News</Link></li>
          <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/about'>About</Link></li>
          <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/contact'>Contact</Link></li>
          <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/latest'>Latest</Link></li>
          {
            menuItems.map((item) => (
              // <div key={item.id}>
              <li className={styles.mobileLi} key={item.id}><Link className={styles.mobileLink} to={`/leftmenus/${item.slug}`}>{item.name}</Link></li>
              // </div>
            ))
          }

          <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/playlists'>Shows</Link></li>
          {token ? (
            <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/logout'>Logout</Link></li>
          ) : (
            <>
              <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/login'>Login</Link></li>
              <li className={styles.mobileLi}><Link className={styles.mobileLink} to='/signup'>Sign Up</Link></li>
            </>
          )
          }
        </ul >
      </div >


    </>
  )
}

export default Navbar