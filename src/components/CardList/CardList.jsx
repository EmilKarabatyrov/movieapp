import React from 'react';
import { Pagination, Spin } from 'antd';

import cl from './CardList.module.css';
import Card from './Card/Card';
import CardSearch from './CardSearch/CardSearch';

function CardList({ loading, search, setSearch, movie, moviesPerPage, totalMovies, setCurrentPage }) {
  const setMoviesPage = (page) => {
    setCurrentPage(page)
  }
  return (
    <div className={cl.Cards}>
      <CardSearch search={search} setSearch={setSearch} />
      <Spin spinning={loading} size="large">
        <ul className={cl.CardsList}>
          <Card movie={movie} loading={loading} />
          <Pagination onChange={setMoviesPage} style={{ marginLeft: 200, marginBottom: 15 }} defaultCurrent={1} total={Math.ceil(totalMovies / moviesPerPage) * 10} />
        </ul>
      </Spin>
    </div>
  );
}

export default CardList;
