import React from 'react';
import { Alert, Rate } from 'antd';
import './CardRated.css'
import { format } from 'date-fns';

import img from './images/i.jpeg';

function CardRated({ item, error, genres }) {
  const cutText = (text, title, maxLength, el = '...') => {
    const wordsTitle = title.split(' ')
    if (text.length <= maxLength && wordsTitle.length < 3) {
      return text
    }
    if (wordsTitle.length > 4) {
      return text.slice(0, maxLength - 60) + el
    }
    return text.slice(0, maxLength) + el
  }
  const filteredGenres = genres.filter((genre) => item.genres.some((id) => genre.id === id)).slice(0, 2);
  const changeColor = (popularity) => {
    if (popularity <= 3) {
      return 'popularity_red'
    } if (popularity > 3 && popularity < 6) {
      return 'popularity_orange'
    } if (popularity > 5 && popularity <= 7) {
      return 'popularity_yellow'
    }
    return 'popularity_green'
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!error ? (
        <li key={item.id} className="item">
          <img className="poster" src={item.poster ? `https://image.tmdb.org/t/p/w200${item.poster}` : img} alt="" />
          <div className="description">
            <h1 className="title">{item.name}</h1>
            <div className={changeColor(item.popularity)}>{item.popularity.toFixed(1)}</div>
            <p className="date">{item.releaseDate ? format(item.releaseDate, 'PP') : 'Нет даты' }</p>
            <div className="genres">
              {filteredGenres.length !== 0 ? (
                filteredGenres.map((genre) => (
                  <p className="genre_item">{genre.name}</p>
                ))
              ) : <div>Нет жанра</div>}
            </div>
            <p className="par">{cutText(item.description, item.name, 190)}</p>
            {/* {starValue ? <span>{stars[starValue - 1]}</span> : null} */}
            <Rate style={{ position: 'absolute', bottom: 20, width: 275 }} value={item.rating} count={10} />
          </div>
        </li>
      ) : (
        <Alert
          style={{ position: 'relative', left: 300, height: 150 }}
          showIcon
          closable
          type="error"
          message="Something went wrong"
          description="Sorry, but the movie is unavailable("
        />
      )}
    </>
  );
}

export default CardRated;
