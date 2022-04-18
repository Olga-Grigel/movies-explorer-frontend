import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  return (
    <section className="elements">
      <div className="elements__grid">
        {movies.map((movie) => (<MoviesCard key={movie.id} movie={movie} />))}
      </div>
      <button className="elements__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;