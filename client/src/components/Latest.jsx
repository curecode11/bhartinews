import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../styles/Latest.module.css'
import { useState } from 'react'
import axios from 'axios'
const Latest = () => {
  const [latestNews, setLatestNews] = useState([]);
  useEffect(() => {
    try {
      const getdata = async () => {
        const news = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=10`)
        setLatestNews(news.data.results)
        // console.log(dataTopNews.data.results);
      }
      getdata();
    }
    catch (error) {
      console.error("error fetching projects", error);
    }
  }, [])


  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.heading}>Latest News</h1>
        <div className={styles.container}>

          <div className={styles.news}>
            {
              latestNews.map((top) => (
                <div className={styles.newsBox} key={top.id}>
                  <h3 className={styles.newsHeadline}>{top.title}</h3>
                  <img className={styles.newsImage} src={top.image_url} alt="sdf" />
                  <p>{top.summary}</p>
                </div>
              ))
            }
          </div>
          <div className={styles.likeNews}>
            {
              latestNews.map((top)=>(
                <div className={styles.likeNewsBox} key={top.id}>
                  <img className={styles.likeNewsImage} src={top.image_url} alt="" />
                  <h6>{top.title}</h6>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Latest