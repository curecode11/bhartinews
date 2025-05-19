import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/PlaylistVideos.module.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const PlaylistVideos = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);

  const API_KEY = import.meta.env.VITE_YT_API_KEY;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        console.error('Failed to load videos:', err);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h2 className={styles.heading}>Playlist Videos</h2>
      <div className={styles.videos}>
        {videos.map((video) => {
          const snippet = video.snippet;
          const videoId = snippet.resourceId?.videoId;
          return (
            <div key={videoId} className={styles.card}>
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
                ></iframe>
              <div className={styles.title}>{snippet.title}</div>
            </div>
          );
        })}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PlaylistVideos;
