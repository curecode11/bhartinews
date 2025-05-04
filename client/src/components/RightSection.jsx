import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/RightSection.module.css';

const RightSection = () => {
    const [topSections, setTopSections] = useState([]);
    const [videos, setVideos] = useState([]);
    const API_KEY = import.meta.env.VITE_YT_API_KEY;
    const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;
    const CMS_API = import.meta.env.VITE_CMS_API;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const top50Res = await axios.get(`${CMS_API}/api/top50s?populate=articles`);
                setTopSections(top50Res.data.data || []);

                // const ytRes = await axios.get(
                //     `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
                // );
                // setVideos(ytRes.data.items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.cont}>
                {topSections.map((section) => (
                    <div key={section.id} className={styles.section}>
                        <div className={styles.header}>
                            <center><b>{section.name}</b></center>
                        </div>
                        <ul className={styles.innercont}>
                            {section.articles?.map((article) => (
                                <div key={article.id} className={styles.box}>
                                    <a href={`/${article.slug}`} className={styles.Link}>
                                        <div className={styles.title}>
                                            <h2 className={styles.headLine}>{article.title}</h2>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className={styles.right}>
                <ul className={styles.rightLinks}>
                    {videos.map((video) => (
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
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RightSection;
