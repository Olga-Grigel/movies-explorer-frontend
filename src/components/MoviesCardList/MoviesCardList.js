import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="elements">
      <div className="elements__grid">
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
        {<MoviesCard />}
      </div>
      <button className="elements__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;