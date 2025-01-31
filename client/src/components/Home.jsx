import React from 'react'
import Navbar from './Navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Footer from './Footer'
const Home = () => {
  const [topNews,setTopNews]=useState([]);

  useEffect(() => {
    try{
      const getdata=async()=>{
        const dataTopNews=await axios.get(`https://api.spaceflightnewsapi.net/v4/blogs/?limit=3`)
        setTopNews(dataTopNews.data.results)
        console.log(dataTopNews.data.results);
      }
      getdata();
    }
    catch(error){
      console.error("error fetching projects",error); 
    }
    
  },[])
  
  return (
    <>
        <Navbar/>
        <div className={styles.main}>
          <div className={styles.brand}>
            <img className={styles.brandImage} src="bharatiNews.png" alt="" />
            <h1 className={styles.brandName}>Bharati News</h1>
          </div>
          <marquee behavior="" direction="">Latest News at your fingertips</marquee>
          <div className={styles.content}>

          <div className={styles.left}>
            <ul className={styles.leftLinks}>
              <li className={styles.link}>North</li>
              <li className={styles.link}>East</li>
              <li className={styles.link}>West</li>
              <li className={styles.link}>South</li>
            </ul>
          </div>
          <div className={styles.mid}>
            <div className={styles.hotTopic}>
              <li className={styles.hotLink}>Delhi Election</li>
              <li className={styles.hotLink}>MahaKumbh</li>
              <li className={styles.hotLink}>Insurgency</li>
              <li className={styles.hotLink}>Bangladesh Crisis</li>
            </div>
            <ul className={styles.midLinks}>
              {
                topNews.map((top)=>(
                  <div className={styles.newsBox} key={top.id}>
                    <h3 className={styles.newsHeadline}>{top.title}</h3>
                    <img className={styles.newsImage} src={top.image_url} alt="sdf" />
                    <p>{top.summary}</p>
                  </div>
                ))
              }
            </ul>
          </div>
          <div className={styles.right}>
            <ul className={styles.rightLinks}>
              <center><b>You might like</b></center>
              {topNews.map((likeNews)=>(
                <div className={styles.likeNewsBox} key={likeNews.id}>
                  <img className={styles.likeNewsImage} src={likeNews.image_url} alt="" />
                  <a className={styles.likeNewsLink} href={likeNews.url}><p className={styles.likeNewsTitle}>{likeNews.title}</p></a>

                </div>
              ))
              }
            </ul>
          </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Home