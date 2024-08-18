import React from 'react';

import classes from './Card.module.css';

function Card({ movie }) {
  return (
    <>
      {movie.map((item) => (
        <li key={item.id} className={classes.Item}>
          <img src={`https://image.tmdb.org/t/p/w200${item.poster}`} alt="" />
          <div className={classes.Description}>
            <h1 className={classes.Title}>{item.name}</h1>
            <p className={classes.Date}>March 5, 2020</p>
            <div className="btns">
              <p className={classes.Genre}>#</p>
              <p className={classes.Genre}>#</p>
            </div>
            <p className={classes.Par}>{item.description}</p>
          </div>
        </li>
      ))}
    </>
  );
}

export default Card;
