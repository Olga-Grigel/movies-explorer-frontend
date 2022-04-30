import './Promo.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import React from 'react';

function Promo() {
  return (
    <section className="colorlanding">
      <Header
        children={
          <div className={(localStorage.getItem('jwt')) ? "colorlanding__auth_disable" : "colorlanding__auth"}>
            <Link to='/signup' className="colorlanding__signup" >{'Регистрация'}</Link>
            <Link to='/signin' className="colorlanding__button" ><p className="colorlanding__buttontext">Войти</p></Link>
          </div>}
        />
      <div className='colorlanding__content'>
        <h1 className='colorlanding__text'>Учебный проект студента факультета Веб-разработки.</h1>
      </div>
    </section>
  );
}

export default Promo;