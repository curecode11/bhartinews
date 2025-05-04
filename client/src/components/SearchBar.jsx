import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/SearchBar.module.css'
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);
  const CMS_API=import.meta.env.VITE_CMS_API;
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce to prevent API flood
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (value.trim() === '') {
        setResults([]);
        return;
      }

      searchArticles(value);
    }, 300); // 300ms debounce
  };

  const searchArticles = async (term) => {
    try {
      const res = await axios.get(`${CMS_API}/api/articles?filters[title][$containsi]=${term}&pagination[limit]=2`);
    //   console.log(res.data.data)
      setResults(res.data.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <div className="search-container" style={{ position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="🔍Search articles..."
        className={styles.brandText}
      />

      {results.length > 0 && (
        <ul className="search-dropdown" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ccc',
          zIndex: 1000,
          maxHeight: '200px',
          overflowY: 'auto',
        }}>
          {results.map((article) => (
            <li key={article.id} className={styles.li} >
                <Link to={`/${article.slug}`} className={styles.Link}>{article.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
