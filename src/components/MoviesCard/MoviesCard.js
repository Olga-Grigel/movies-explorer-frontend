import React, { Children } from 'react';
import './MoviesCard.css';
import markV from "../../images/V.svg"
import markX from "../../images/X.svg"


function MoviesCard(props) {
  // const isSaved = props.savedMovies.some((movie) => movie.owner === props.currentUser._id) || (props.movie.owner === props.currentUser._id);

  // function handleClick() {
  //   if (!isSaved) {
  //     props.handleSavedMovie(props.movie)
  //   }
  //   const savedMovi = props.savedMovies.filter((m) => m.id = props.movie.id)
  //   props.handleDeleteMovie(savedMovi)
  // }
  
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

  function handleClickButtonSave() {
    props.clickButtonSave(props.movie);
  }
  
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
      <button type="button" className={props.selectorButton} onClick={handleClickButtonSave}><div className={props.selectorText}>{props.textButton}</div></button>
    </div>
  );
}

export default MoviesCard;