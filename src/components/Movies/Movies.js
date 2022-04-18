import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ movies, handleSearch }) {
  return (
    <section className="movies">
      {<Header />}
      {<SearchForm
        handleSearch={handleSearch}
      />}
      {<MoviesCardList
        movies={movies}
      />}
      {<Footer />}
    </section>

  );
}

export default Movies;