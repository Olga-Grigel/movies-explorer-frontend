import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const isClick = props.savedMovies.some(item => item.id === props.id)

  function durationMovie(min) {
    if (min > 59) {
      const hours = Math.trunc(min / 60);
      const minutes = min % 60;
      return hours + ' ч. ' + minutes + ' мин.';
    }
    else {
      return min + ' минут';
    }
  }

  const [click, setclick] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (props.movie.hasOwnProperty("owner")) {
      return setSaved(true)
    }    
    isClick ? setclick(true) : setclick(false);
    return setSaved(false)
  }, [props.savedMovies, props.id]);

  function hcangeStatusMovie() {
    setclick(!click)
  }

  function handleClick() {
    if (!isClick) {
      props.handleSavedMovie(props.movie)
      hcangeStatusMovie()
    }
    props.savedMovies.forEach((movie) => {
      if (movie.id === props.movie.id) {
        props.handleDeleteMovie(movie._id)
        hcangeStatusMovie()
      }
    });
  }
  const selectorButton = ((!click) ? "element__button" : "element__button element__button_active")
  const textButton = ((!click) ? "Сохранить" : "")
  const selectorText = ((!click) ? "element__button_text" : "element__button_image_V")

  //пока плохо работает
  return (
    <div className="element">
      <div className="element__textblock">
        <p className="element__text">{props.movie.nameRU}</p>
        <p className="element__time">{
          durationMovie(props.movie.duration)
        }
        </p>
      </div>
      <img className="element__photo" src={props.foto} alt="Картинка с фильма" />
      <button type="button" className={(saved) ? "element__button" : selectorButton} onClick={handleClick}><div className={(saved) ? "element__button_image_X" : selectorText}>{(saved) ? "" : textButton}</div></button>
    </div>
  );
}

export default MoviesCard;