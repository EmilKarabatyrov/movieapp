import React from 'react';
import { Spin } from 'antd';

import cl from './CardList.module.css';
import Card from './Card/Card';

const CardList = ({ movie, loading }) => {
  return (
    <div className={cl.Cards}>
      <Spin spinning={loading} size="large">
        <ul className={cl.CardsList}>
          <Card movie={movie} loading={loading} />
        </ul>
      </Spin>
    </div>
  );
};

export default CardList;
