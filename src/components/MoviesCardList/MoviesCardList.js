import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, buttonDisabled, handleDeleteMovie, clickButtonSave, savedMovies, currentUser, selectorButton, textButton, selectorText }) {

  function cleanUrlImage(m) {
    if (typeof m.image === 'object') {
      return "https://api.nomoreparties.co" + m.image.url
    } return m.image
  }

  return (
    <section className="elements">
      <div className="elements__grid">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            foto={cleanUrlImage(movie)}
            handleDeleteMovie={handleDeleteMovie}
            clickButtonSave={clickButtonSave}
            savedMovies={savedMovies}
            currentUser={currentUser}
            selectorButton={selectorButton}
            textButton={textButton}
            selectorText={selectorText}
          />))}
      </div>
      <button className={buttonDisabled === "on" ? 'elements__button' : 'elements__button_disabled'}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;