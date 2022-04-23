import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ movies, handleSearch, onMenu, handleDeleteMovie, currentUser, selector }) {
  function clickButtonSave(movie) {
    console.log(`Фильм должен удаляться, но пока не работает`)
  }
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
          handleDeleteMovie={handleDeleteMovie}
          currentUser={currentUser}
          selector={selector}
          selectorButton={"element__button"}
          textButton={""}
          selectorText={"element__button_image_X"}
          clickButtonSave={(movie)=>clickButtonSave(movie)}
        />}
      </div>
      {<Footer />}
    </section>

  );
}

export default SavedMovies;