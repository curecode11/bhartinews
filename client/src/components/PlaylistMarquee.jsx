import React, { useEffect, useState } from 'react';
import styles from '../styles/PlaylistMarquee.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const PlaylistMarquee = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_YT_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // const res = await fetch(
        //   `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`
        // );
        // const data = await res.json();
        // setPlaylists(data.items || []);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    
    <>
      <div className={styles.container}>
        <center><h4 className={styles.heading}>Shows</h4></center>
        <div className={styles.marquee}>
          <div className={styles.content}>
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={styles.card}
                onClick={() => handleClick(playlist.id)}
              >
                {playlist.snippet.title}
              </div>
            ))}
          </div>

        </div>
      </div>
      <Link to='/playlists' className={styles.btnLink}><button className={styles.btn}>See More</button></Link>
    </>
  );
};

export default PlaylistMarquee;
