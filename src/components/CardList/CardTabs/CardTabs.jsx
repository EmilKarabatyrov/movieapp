import React from 'react';

import './CardTabs.css';

function CardTabs({ toggleTab, changeTab }) {
  return (
    <div className="btns-wrapper">
      <button
        className={toggleTab === 1 ? 'btns active' : 'btns'}
        type="button"
        aria-label="tab-button"
        onClick={() => changeTab(1)}
      >
        Search
      </button>
      <button
        className={toggleTab === 2 ? 'btns active' : 'btns'}
        type="button"
        aria-label="tab-button"
        onClick={() => changeTab(2)}
      >
        Rated
      </button>
    </div>
  );
}

export default CardTabs;
