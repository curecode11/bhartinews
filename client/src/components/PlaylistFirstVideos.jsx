import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/PlaylistFirstVideos.module.css';
import Navbar from './Navbar';
import Footer from './Footer';

const PlaylistFirstVideos = () => {
  const [videos, setVideos] = useState([]);
  const API_KEY = import.meta.env.VITE_YT_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=25&key=${API_KEY}`
        );
        const playlistData = await playlistRes.json();
        const playlists = playlistData.items || [];

        const videoPromises = playlists.map(async (playlist) => {
          const videoRes = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlist.id}&key=${API_KEY}`
          );
          const videoData = await videoRes.json();
          const firstVideo = videoData.items?.[0]?.snippet;

          return {
            playlistId: playlist.id, // ✅ used for routing
            playlistTitle: playlist.snippet.title,
            videoId: firstVideo?.resourceId?.videoId,
            videoTitle: firstVideo?.title,
          };
        });

        const results = await Promise.all(videoPromises);
        setVideos(results.filter((v) => v.videoId));
      } catch (error) {
        console.error('Error fetching playlists or videos:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h2 className={styles.heading}>Playlist Highlights</h2>
      <div className={styles.grid}>
        {videos.map((item, index) => (
          <div key={index} className={styles.card}>
            <iframe
              src={`https://www.youtube.com/embed/${item.videoId}`}
              title={item.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
              />
            <Link to={`/playlist/${item.playlistId}`} className={styles.title}>
              {item.playlistTitle}
            </Link>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PlaylistFirstVideos;
