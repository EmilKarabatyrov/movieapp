import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Alert } from 'antd';

import CardList from './components/Cards/CardList';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState([
    {
      id: 42,
      poster: null,
      name: 'Movie',
      date: null,
      description: 'Something description',
    },
    {
      id: 32,
      poster: null,
      name: 'Movie',
      date: null,
      description: 'Something description',
    },
    {
      id: 54,
      poster: null,
      name: 'Movie',
      date: null,
      description: 'Something description',
    },
    {
      id: 58,
      poster: null,
      name: 'Movie',
      date: null,
      description: 'Something description',
    },
    {
      id: 22,
      poster: null,
      name: 'Movie',
      date: null,
      description: 'Something description',
    },
    {
      id: 44,
      poster: null,
      name: 'Movie',
      date: null,
      description: 'Something description',
    },
  ]);

  const getMovies = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e8e53aff98f7fd1bae0c12dcdc9db555`);

    if (!res.ok) {
      throw new Error('Sorry, but the movie is unavailable');
    }
    const response = await res.json();
    return response;
  };

  useEffect(() => {
    const loadData = async () => {
      const ids = [2, 3, 5, 6, 8, 11];
      const setMovieId = ids.map((id) => getMovies(id));

      const results = await Promise.all(setMovieId);
      setMovie(
        results.map((item) => {
          return {
            id: ids.id,
            poster: item.poster_path,
            name: item.title,
            description: item.overview,
          };
        })
      );
      setLoading(false);
    };
    setTimeout(() => {
      loadData().catch((err) => {
        setError(true);
        console.log(err);
      });
    }, 1000);
  }, []);
  return (
    <div className="moviesapp">
      {error ? (
        <Alert
          showIcon
          closable
          type="error"
          message="Something went wrong"
          description="Sorry, but the movie is unavailable"
        />
      ) : null}
      {!error ? <CardList error={error} loading={loading} movie={movie} /> : null}
    </div>
  );
}

export default App;
