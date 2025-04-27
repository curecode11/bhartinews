import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer'
import styles from '../styles/NewsList.module.css'
import { Link } from 'react-router-dom';
import RightSection from './RightSection';
const NewsList = () => {
    const { newscategory, type } = useParams();
    // console.log(type)
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1337/api/${newscategory}?filters[slug][$eq]=${type}&populate[articles][populate]=media`
                );

                const fetchedArticles = response.data.data[0]?.articles || [];

                // Sort by createdAt descending (latest first)
                const sortedArticles = [...fetchedArticles].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setArticles(sortedArticles);
            } catch (error) {
                console.log(error);
            }
        };

        getNews();
    }, [newscategory, type]);

    return (
        <>
            <Navbar />
            <div className={styles.headLine}><h1>{type.toUpperCase()}</h1></div>
            <div className={styles.main}>

                <div className={styles.left}>
                    {
                        articles.map((item) => (
                            <div className={styles.newsBox} key={item.id}>
                                <h3 className={styles.newsHeadline}>{item.title}</h3>
                                <img className={styles.newsImage} src={`http://localhost:1337${item.media[0].formats.medium.url}`} alt="" />
                                <p className={styles.date}>
                                    Published On: {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                                <div className={styles.likeAndMore}>
                                    <Link to={`/${item.slug}`} className={styles.readMore}>Read Full Article</Link>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className={styles.right}>
                    <RightSection />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NewsList