import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ movies, handleSearch, onMenu }) {
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
          movies={movies} />}
      </div>
      {<Footer />}
    </section>

  );
}

export default SavedMovies;