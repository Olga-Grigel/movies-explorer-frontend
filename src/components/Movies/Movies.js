import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <section className="movies">
      {<Header />}
      {<SearchForm />}
      {<MoviesCardList />}
      {<Footer />}
    </section>

  );
}

export default Movies;