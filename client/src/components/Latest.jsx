import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/Latest.module.css';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import RightSection from './RightSection';
import { Link } from 'react-router-dom';
const Latest = () => {
  const [latestNews, setLatestNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      try {
        const news = await axios.get(`/articles?populate=*&sort=createdAt:desc`);
        setLatestNews(news.data.data);
      } catch (error) {
        console.error("Error fetching articles", error);
      }
    };
    getdata();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.heading}>Latest News</h1>
        <div className={styles.container}>

          {/* Main Articles */}
          <div className={styles.news}>
            {latestNews.map((article) => (
              <div className={styles.newsBox} key={article.id}>
                <h3 className={styles.newsHeadline}>{article.title}</h3>
                <img
                  className={styles.newsImage}
                  src={`http://localhost:1337${article.media[0].url}`}
                  alt={article.title}
                />
                <p className={styles.newsSummary}>
                  {article.summary?.slice(0, 200)}...
                </p>

                <Link to={`/${article.slug}`}><button
                  className={styles.readMoreBtn}
                >
                  Read More
                </button></Link>

              </div>
            ))}
          </div>

          {/* Sidebar - Liked/Popular News */}
          {/* <div>
            <RightSection />
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Latest;
