import './SearchForm.css';
import React from 'react';


function SearchForm({ handleSearch, handleChangeInput, values, handleChangeСheckbox, checked }) {
  
  //функция сабмита
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(values.search, checked);
  }
  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__string">
          <input id="search" type="text" value={values.search} onChange={handleChangeInput} name="search" className="search__input" placeholder="Фильм" />
          <button type="submit" className="search__find" alt="Значок 'найти'"></button>
        </div>
      </form>
      <label className="search__checkbox">
        <input type="checkbox" checked={checked} onChange={handleChangeСheckbox} />
        <span className="search__switch"></span>
        <p className="search__text">Короткометражки</p>
      </label>
    </section>
  );
}

export default SearchForm;