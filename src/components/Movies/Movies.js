import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ movies, handleSearch, onMenu, onSavedMovie, }) {
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
        onSavedMovie={onSavedMovie}
      />}
      <button className="elements__button">Ещё</button>
      {<Footer />}
    </section>

  );
}

export default Movies;