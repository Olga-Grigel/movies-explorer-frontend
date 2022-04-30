import './Navigation.css';
import { Link } from 'react-router-dom';
import imageAccount from '../../images/account.svg';

function Navigation({ onClose}) {

  return (
    <ul className={(localStorage.getItem('jwt'))?"navigation":"navigation_disable"}>
      <li className="navigation__block">
        <ul className="navigation__menu">
          <li className="navigation__list"><Link to='/' className="navigation__link navigation__link_home" activeclassname="navigation__link_active" onClick={onClose}>{'Главная'}</Link></li>
          <li className="navigation__list navigation__list_movies"><Link to='/movies' className="navigation__link navigation__link_movies" activeclassname="navigation__link_active" onClick={onClose}>{'Фильмы'}</Link></li>
          <li className="navigation__list"><Link to='/saved-movies' className="navigation__link navigation__link_saved" activeclassname="navigation__link_active" onClick={onClose}>{'Сохраненные фильмы'}</Link></li>
        </ul>
      </li>
      <li className="navigation__block"><Link to='/profile' className="navigation__link navigation__link navigation__link_account" onClick={onClose}>{'Аккаунт'}<div className="navigation__account"><img className="navigation__icon" src={imageAccount} alt="Значок аккаунта" /></div></Link></li>
    </ul >
  );
}

export default Navigation;