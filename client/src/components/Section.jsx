import React, { useState } from 'react'
import styles from '../styles/Section.module.css'
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Section = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    try {
      const getCards = async () => {
        const response = await axios.get("http://localhost:1337/api/cards?populate[articles][populate]=*");
        // console.log(response.data.data[0].articles)
        setCards(response.data.data)
      }
      getCards();

    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <>
      <div className={styles.main}>
        {
          cards.map((item) => (
            <div className={styles.newsSection} key={item.id}>
              <center className={styles.heading}><p>{item.name}</p></center>
              <marquee
                onMouseOver={(e) => e.target.stop()}
                onMouseOut={(e) => e.target.start()}
                className={styles.container}>
                {
                  item.articles.map((article) => (
                    <div className={styles.newsBox} key={article.id}>
                      <img src={`http://localhost:1337${article.media[0].formats.small.url}`} alt="" />
                      <p>{article.title}</p>
                    </div>
                  ))
                }
              </marquee>
              <Link to={`/cards/${item.slug}`} className={styles.readMore}>See More</Link>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Section