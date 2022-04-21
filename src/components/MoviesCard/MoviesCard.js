import React from 'react';
import pic from '../../images/pic.png';
import './MoviesCard.css';

function MoviesCard(props) {

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

  function handleSavedMovie() {
    console.log('кнопку нажала, уровень 1 прошла')
    console.log(props.movie)
    props.onSavedMovie(props.movie);
    
  }

  return (
    <div className="element">
      <div className="element__textblock">
        <p className="element__text">{props.movie.nameRU}</p>
        <p className="element__time">{
          durationMovie(props.movie.duration)
        }
        </p>
      </div>
      <img className="element__photo" src={'https://api.nomoreparties.co/' + props.movie.image.url} alt="Картинка с фильма" />
      <button type="button" className="element__button" onClick={handleSavedMovie}>Сохранить</button>
    </div>
  );
}

export default MoviesCard;