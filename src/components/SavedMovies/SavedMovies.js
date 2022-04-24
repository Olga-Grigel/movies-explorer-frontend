import './SavedMovies.css';
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ movies, handleSearch, onMenu, handleDeleteMovie, savedMovies, currentUser, selector }) {

  // function clickButtonSave() {
  //   console.log(`Фильм должен удаляться, но пока не работает`)
  // }
  return (
    <section className="savedmovies">
      {<Header
        onMenu={onMenu}
      />}
      {<SearchForm
        handleSearch={handleSearch}
      />}
      <div className="savedmovies__cards">
        {<MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
          currentUser={currentUser}
          selector={selector}
          selectorButton={"element__button"}
          textButton={""}
          selectorText={"element__button_image_X"}
        />}
      </div>
      {<Footer />}
    </section>

  );
}

export default SavedMovies;