import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies({ movies, handleSearch, onMenu, handleDeleteMovie, handleSavedMovie, savedMovies, currentUser, invalidSearch, onPreloader, addMovies, inactiveButtonMore}) {
  
  //инпут поисковой строки
  const [values, setValues] = React.useState({ search: '' })

  React.useEffect(() => {
    if (localStorage.getItem('word')) {
      return setValues({ search: localStorage.getItem('word') })
    }
    return setValues({ search: '' })
  }, [])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setValues(v => ({
      ...v,
      [name]: value,
    }))
  }
  //чекбокс
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('word')) {
      return setChecked(JSON.parse(localStorage.getItem('checkbox')))
    }
    return setChecked(false)
  }, [])

  function handleChangeСheckbox() {
    setChecked(!checked);
  }

  return (
    <section className="movies">
      {<Header
        onMenu={onMenu}
      />}
      {<SearchForm
        handleSearch={handleSearch}
        handleChangeInput={handleChangeInput}
        values={values}
        handleChangeСheckbox={handleChangeСheckbox}
        checked={checked}
      />}
      <p className={(invalidSearch.onStatus) ? "movies_error_active" : "movies_error_disable"}>{(invalidSearch.onStatus) ? invalidSearch.title : ""}</p>
      <div className={(onPreloader) ? "savedmovies__preloader_active" : "savedmovies__preloader_disable"}>{<Preloader />}</div>
      <div className={(!invalidSearch.onStatus) ? "movies_list_active" : "movies_list_disable"}>
        < MoviesCardList
          movies={movies}
          handleDeleteMovie={handleDeleteMovie}
          handleSavedMovie={handleSavedMovie}
          savedMovies={savedMovies}
          currentUser={currentUser}
        />
      </div>
      <button className={(!inactiveButtonMore) ? "elements__button" : "elements__button_disabled"} onClick={addMovies}>Ещё</button>
      <button className={(inactiveButtonMore) ? "elements__button_inactive" : "elements__button_disabled"}>Ещё</button>
      {<Footer />}
    </section>

  );
}

export default Movies;