import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import { Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import axios from 'axios';

import getMovie from './Request/Request';
import CardList from './components/CardList/CardList';
import useDebounce from './Hooks/useDebounce';

function App() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rated, setRated] = useState(JSON.parse(sessionStorage.getItem('rated') || JSON.stringify({})));
  const [genres, setGenres] = useState([]);
  const debounceSearch = useDebounce(search, 500)
  const filterMovie = useMemo(() => movie.filter((mv) => mv.name.toLowerCase().includes(search.toLowerCase())), [debounceSearch, movie]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
      // eslint-disable-next-line max-len
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGU1M2FmZjk4ZjdmZDFiYWUwYzEyZGNkYzlkYjU1NSIsIm5iZiI6MTcyMzU3MjMzNS43NTU3ODIsInN1YiI6IjY2OWY3NDhjYjU3M2VmMjcxMGYzOWM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9kpAdfdbShQrCFksU8oo8n1X5vih68CWrNoJtOxXaBw',
    },
  }
  const getGenres = () => axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  useEffect(() => {
    getMovie(search, currentPage).then((response) => {
      setTotalPages(response.data.total_results)
      console.log(response.data.results);
      return response.data.results
    }).then((res) => {
      if (search) {
        setLoading(false);
      }
      setMovie(res.map((item) => ({
        id: item.id,
        poster: item.poster_path,
        name: item.title,
        description: item.overview,
        popularity: item.vote_average,
        releaseDate: item.release_date,
        genres: item.genre_ids,
        rating: 0,
      })))
    }).catch(() => {
      setError(true)
    })
    getGenres().then((response) => response.data.genres)
      .then((data) => {
        setGenres(data)
        console.log(data);
      })
  }, [currentPage, debounceSearch]);
  const onRated = (movieElem, value) => {
    const newRated = rated;

    newRated[movieElem.id] = { ...movieElem, rating: value }
    setMovie(movie.map((item) => {
      if (item.id === movieElem.id) {
        return {
          ...item,
          rating: value,
        }
      }
      return item
    }))
    setRated({ ...newRated })
    sessionStorage.setItem('rated', JSON.stringify(newRated));
  }
  return (
    <div className="moviesapp">
      <Offline>
        <Alert
          showIcon
          closable
          type="error"
          message="Something went wrong"
          description="Sorry we can't load the page, check your internet connection"
        />
      </Offline>
      <Online>
        <CardList
          rated={Object.values(rated)}
          genres={genres}
          onRated={onRated}
          loading={loading}
          totalPages={totalPages}
          movie={filterMovie}
          setCurrentPage={setCurrentPage}
          search={search}
          setSearch={setSearch}
          error={error}
        />
      </Online>
    </div>
  );
}

export default App;
