import React from 'react';
import pic from '../../images/pic.png';
import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <div className="element">
      <div className="element__textblock">
        <p className="element__text">В погоне за Бенкси</p>
        <p className="element__time">27 минут</p>
      </div>
      <img className="element__photo" src={pic} alt="Картинка с фильма"/>
      <button type="button" className="element__button">Сохранить</button>
    </div>
  );
}

export default MoviesCard;