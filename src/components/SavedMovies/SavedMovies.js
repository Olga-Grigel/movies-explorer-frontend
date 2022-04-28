import './SavedMovies.css';
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ movies, handleSearch, onMenu, handleDeleteMovie, savedMovies, currentUser, invalidSearchSavedMovies, onPreloader }) {
  
  //инпут поисковой строки
  const [values, setValues] = React.useState({ search: '' })

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setValues(v => ({
      ...v,
      [name]: value,
    }))
  }
  //чекбокс
  const [checked, setChecked] = React.useState(false);

  function handleChangeСheckbox() {
    setChecked(!checked);
  }

  return (
    <section className="savedmovies">
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
      <p className={(invalidSearchSavedMovies.onStatus) ? "movies_error_active" : "movies_error_disable"}>{(invalidSearchSavedMovies.onStatus) ? invalidSearchSavedMovies.title : ""}</p>
      <div className={(onPreloader) ? "savedmovies__preloader_active" : "savedmovies__preloader_disable"}>{<Preloader />}</div>
      <div className={(!invalidSearchSavedMovies.onStatus) ? "savedmovies__cards_active" : "savedmovies__cards_disable"}>
        {<MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
          currentUser={currentUser}
          selectorButton={"element__button"}
          textButton={""}
          selectorText={"element__button_image_X"}
        />}
      </div>
      {<Footer />}
    </section >
  );
}

export default SavedMovies;