import React, { useState } from 'react';
import { Pagination, Spin } from 'antd';

import cl from './CardList.module.css';
import Card from './Card/Card';
import CardSearch from './CardSearch/CardSearch';
import CardTabs from './CardTabs/CardTabs';
import CardRated from './CardRated/CardRated';

function CardList({ setSearch, search, movie, error, setCurrentPage, totalPages, loading, onRated, rated, genres }) {
  const [toggleTab, setToggleTab] = useState(1);
  const changeTab = (index) => {
    setToggleTab(index);
  }
  const setMoviesPage = (page) => {
    if (!loading) {
      setCurrentPage(page)
    }
  }
  return (
    <div className={cl.Cards}>
      <CardTabs toggleTab={toggleTab} changeTab={changeTab} />
      <Spin spinning={search ? loading : null} size="large">
        {toggleTab === 1 ? (
          <>
            <CardSearch search={search} setSearch={setSearch} />
            <ul className={cl.CardsList}>
              {movie.length !== 0 ? (
                movie.map((item) => (
                  <Card genres={genres} onRated={onRated} loading={loading} item={item} error={error} />
                ))
              ) : <div style={{ position: 'relative', left: 400 }}>Movies is not found</div>}
              {search && movie.length !== 0 ? (
                <Pagination
                  onChange={setMoviesPage}
                  style={{ marginLeft: 300, marginBottom: 10 }}
                  defaultCurrent={1}
                  total={totalPages}
                  showSizeChanger={false}
                  pageSize={20}
                />
              ) : null}
            </ul>
          </>
        ) : (
          <ul className={cl.CardsList}>
            {
              rated.map((item) => (
                <CardRated genres={genres} movie={movie} search={search} error={error} item={item} />
              ))
            }
          </ul>
        )}
      </Spin>
    </div>
  );
}

export default CardList;
