import React from 'react';

import cl from './CardSearch.module.css'

function CardSearch({ search, setSearch }) {
  return (
    <form className={cl.InputBox} onSubmit={(e) => e.preventDefault()}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className={cl.Input} placeholder="Type to search..." />
    </form>
  )
}
export default CardSearch;
