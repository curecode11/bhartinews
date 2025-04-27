import React, { useEffect, useState } from 'react';
import styles from '../styles/AutoPlaylistSlider.module.css';

const AutoPlaylistSlider = () => {
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(0);

  const API_KEY = import.meta.env.VITE_YT_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // const playlistRes = await fetch(
        //   `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=25&key=${API_KEY}`
        // );
        // const playlistData = await playlistRes.json();

        // const playlistItems = await Promise.all(
        //   (playlistData.items || []).map(async (playlist) => {
        //     const res = await fetch(
        //       `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlist.id}&key=${API_KEY}`
        //     );
        //     const data = await res.json();
        //     const first = data.items?.[0]?.snippet;
        //     return first?.resourceId?.videoId
        //       ? {
        //           title: playlist.snippet.title,
        //           videoId: first.resourceId.videoId,
        //         }
        //       : null;
        //   })
        // );

        // setVideos(playlistItems.filter(Boolean));
      } catch (err) {
        console.error('Error loading videos:', err);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 100000);
    return () => clearInterval(interval);
  }, [videos]);

  if (!videos.length || !videos[current]) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const currentVideo = videos[current];

  return (
    <div className={styles.slider}>
      <iframe
        key={currentVideo.videoId}
        className={styles.video}
        src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&mute=1`}
        title={currentVideo.title}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className={styles.title}>{currentVideo.title}</div>
    </div>
  );
};

export default AutoPlaylistSlider;
