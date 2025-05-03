import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/NewsDetail.module.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import PlaylistMarquee from './PlaylistMarquee';
import RightSection from './RightSection'
import AutoPlaylistSlider from './AutoPlaylistSlider'
const NewsDetail = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`
                );

                setArticle(res.data.data[0]);
                console.log(article)
            } catch (err) {
                console.error("Error fetching article:", err);
            }
        };

        fetchArticle();
    }, [slug]);

    if (!article) return <p>Loading...</p>;

    return (
        <>
            <Navbar />

            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.newsBox}>
                        {/* Category and Date */}
                        <div className={styles.meta}>
                            <span className={styles.category}>
                                Category: {article.category?.name || article.leftmenu?.name || article.top50?.name || "General"}
                            </span>
                            <span className={styles.date}>
                                {new Date(article.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className={styles.newsHeadline}>{article.title}</h1>

                        {/* Image */}
                        {article.media?.[0]?.formats?.large?.url && (
                            <img
                                className={styles.newsImage}
                                src={`http://localhost:1337${article.media[0].formats.large.url}`}
                                alt={article.title}
                            />
                        )}

                        {/* Full Rich Text Content */}
                        <div className={styles.newsContent}>
                            {article.content?.map((block, index) => (
                                <div key={index}>
                                    {block.children?.map((child, idx) => (
                                        <p key={idx}>{child.text}</p>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className={styles.left}>
                        <RightSection />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewsDetail;
