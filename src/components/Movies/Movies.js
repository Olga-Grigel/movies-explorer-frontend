import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ movies, handleSearch, onMenu, handleDeleteMovie, handleSavedMovie, savedMovies, currentUser }) {
const [click, setclick] = React.useState(false);

    function hcangeSelector() {
      if (!click) {
        return setclick(true);
      } return setclick(false);
    }

  function clickButtonSave(movie) {
    console.log(click)
    hcangeSelector()
    console.log(`Фильм должен coхраняться/удаляться, но пока работает не правильно`)
    handleSavedMovie(movie)
  }

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
        clickButtonSave={(movie)=>clickButtonSave(movie)}
        savedMovies={savedMovies}
        currentUser={currentUser}
        selectorButton={((!click) ? "element__button" : "element__button element__button_active")}
        textButton={((!click) ? "Сохранить" : "")}
        selectorText={((!click) ? "element__button_text" : "element__button_image_V")}
      />}
      <button className="elements__button">Ещё</button>
      {<Footer />}
    </section>

  );
}

export default Movies;