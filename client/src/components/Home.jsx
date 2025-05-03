import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Footer from './Footer'
import Section from './Section'
import SearchBar from './SearchBar'
import RightSection from './RightSection'
import PlaylistMarquee from './PlaylistMarquee'
import AutoPlaylistSlider from './AutoPlaylistSlider'
import CurrentDate from './CurrentDate'
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const API_KEY = import.meta.env.VITE_YT_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;

  useEffect(() => {
    try {
      const getdata = async () => {
        const dataTopNews = await axios.get(`http://localhost:1337/api/articles?populate=*&sort=createdAt:desc`)
        // console.log(dataTopNews.data.data)
        setTopNews(dataTopNews.data.data)
        // console.log(topNews[0]);
      }
      const getVideos = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=AIzaSyA7XkcTlvVIu226DNGPH5yreH86fPTENQM&channelId=UCuOPY-98JUY9T2igRpj8tIQ&part=snippet,id&order=date&maxResults=10`
        );
        // console.log(response.data);
        setVideos(response.data.items);
      }
      const getCategories = async () => {
        const response = await axios.get('http://localhost:1337/api/categories?populate=*&sort=createdAt:desc')
        // console.log(response.data.data)
        setCategories(response.data.data)
      }
      const getNews = async () => {
        const breaking = await axios.get('http://localhost:1337/api/breakingstories?populate=*&sort=createdAt:desc')
        setBreakingNews(breaking.data.data)
        console.log(breaking.data.data[0])
      }
      // const getMenu = async () => {
      //   const response = await axios.get('http://localhost:1337/api/leftmenus?populate=*')
      //   // console.log(response.data.data)
      //   setMenuItems(response.data.data);
      // }
      getdata();
      // getVideos(); 
      getNews();
      getCategories();
      // getMenu();
    }
    catch (error) {
      console.error("error fetching projects", error);
    }

  }, [])


  return (
    <>
      <div className={styles.main}>
        <Navbar />
        
                <div className={styles.search}>
                  <CurrentDate/>
                  <SearchBar/>
                </div>
        <div className={styles.breaking}>
          <div className={styles.breakingDesc}>Breaking News</div>
          <marquee className={styles.breakingSection} behavior="" direction="" >
            <div className={styles.breakingContainer}>
              {
                breakingNews.map((news) => (
                  <div key={news.id} className={styles.breakingNews}>
                    <p>{
                      news.title[0].children[0].text}</p>
                  </div>
                ))
              }
            </div>
          </marquee>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <PlaylistMarquee />
          </div>
          <div className={styles.mid}>
            <div className={styles.hotTopic}>
              {/* <li className={styles.hotLink}>Delhi Election</li>
              <li className={styles.hotLink}>MahaKumbh</li> */}
              {
                categories.map((item) => (
                  <div key={item.id}>
                    <Link className={styles.Link} to={`/categories/${item.slug}`}><li className={styles.hotLink}>{item.name}</li></Link>
                  </div>
                ))
              }
            </div>
            <div className={styles.carousel}>
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/bharatiNetwork.png" className={`d-block w-100 ${styles.cItem}`} alt="..." />
                  </div>
                  <div className="carousel-item active">
                    <img src="/bharatiNetwork.png" className={`d-block w-100 ${styles.cItem}`} alt="..." />
                  </div>
                  <div className="carousel-item active">
                    <img src="/bharatiNetwork.png" className={`d-block w-100 ${styles.cItem}`} alt="..." />
                  </div>
                  
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

            </div>

            <ul className={styles.midLinks}>
              {
                topNews.slice(0, 2).map((top) => (  // ← show only first two news items
                  <div className={styles.newsBox} key={top.id}>
                    <h3 className={styles.newsHeadline}>{top.title}</h3>
                    <img className={styles.newsImage} src={`http://localhost:1337${top?.media[0]?.formats.large.url}`} alt="sdf" />
                    <div className={styles.likeAndMore}>
                      <Link to={`/${top.slug}`} className={styles.readMore}>Read more</Link>
                    </div>
                  </div>
                ))
              }
            </ul>
            <Link to='latest' className={styles.latest}><center>Go To Latest</center></Link>
          </div>
          <div className={styles.right}>
            <RightSection />
            {/* {
                videos.map((video) => (
                  <div key={video.id.videoId} className={styles.likeNewsBox}>
                    <a
                    className={styles.likeNewsLink}
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      >
                      <img
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      className={styles.likeNewsImage}
                      />
                      <div className={styles.likeNewsTitle}>
                        <h2 className={styles.likeNewsTitle}>{video.snippet.title}</h2>
                      </div>
                    </a>
                  </div>
                ))
              } */}
            {/* </ul> */}
          </div>
        </div>
      </div >

      <center>
        <AutoPlaylistSlider />
      </center>
      <Section />
      <Footer />
    </>
  )
}

export default Home