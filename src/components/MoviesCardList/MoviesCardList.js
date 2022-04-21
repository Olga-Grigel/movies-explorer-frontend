import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, buttonDisabled, onSavedMovie}) {
  return (
    <section className="elements">
      <div className="elements__grid">
        {movies.map((movie) => (<MoviesCard key={movie.id} movie={movie} onSavedMovie={onSavedMovie} />))}
      </div>
      <button className={buttonDisabled === "on" ? 'elements__button' : 'elements__button_disabled'}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;