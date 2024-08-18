import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
    // eslint-disable-next-line max-len
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGU1M2FmZjk4ZjdmZDFiYWUwYzEyZGNkYzlkYjU1NSIsIm5iZiI6MTcyMzU3MjMzNS43NTU3ODIsInN1YiI6IjY2OWY3NDhjYjU3M2VmMjcxMGYzOWM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9kpAdfdbShQrCFksU8oo8n1X5vih68CWrNoJtOxXaBw',
  },
}
const getMovie = (query, page) => axios.get(
  `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
  options,
)
export default getMovie
