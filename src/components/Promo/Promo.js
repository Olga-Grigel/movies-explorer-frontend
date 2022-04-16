import './Promo.css';
import imageLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Promo() {
  return (
      <section className="colorlanding">
        <div className='colorlanding__title'>
          <img className="colorlanding__logo" src={imageLogo} alt="Логотип" />
          <div className="colorlanding__auth">
            <Link to='/signup' className="colorlanding__signup" >{'Регистрация'}</Link>
            <Link to='/signin' className="colorlanding__button" ><p className="colorlanding__buttontext">Войти</p></Link>
          </div>
        </div>
        <div className='colorlanding__content'>
          <h1 className='colorlanding__text'>Учебный проект студента факультета Веб-разработки.</h1>
        </div>
      </section>
  );
}

export default Promo;