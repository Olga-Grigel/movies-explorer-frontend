import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <section className="savedmovies">
      {<Header />}
      {<SearchForm />}
      <div className="savedmovies__cards">
        {<MoviesCardList />}
      </div>
      {<Footer />}
    </section>

  );
}

export default SavedMovies;