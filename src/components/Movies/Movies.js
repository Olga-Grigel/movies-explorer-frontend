import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ movies, handleSearch, onMenu, handleDeleteMovie, handleSavedMovie, savedMovies, currentUser }) {
  return (
    <section className="movies">
      {<Header
        onMenu={onMenu}
      />}
      {<SearchForm
        handleSearch={handleSearch}
      />}
      {<MoviesCardList
        movies={movies}
        handleDeleteMovie={handleDeleteMovie}
        handleSavedMovie={handleSavedMovie}
        savedMovies={savedMovies}
        currentUser={currentUser}
      />}
      <button className="elements__button">Ещё</button>
      {<Footer />}
    </section>

  );
}

export default Movies;