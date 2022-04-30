import './Navigation.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import imageAccount from '../../images/account.svg';

function Navigation({ onClose}) {

  return (
    <ul className={(localStorage.getItem('jwt'))?"navigation":"navigation_disable"}>
      <li className="navigation__block">
        <ul className="navigation__menu">
          <li className="navigation__list"><NavLink to='/' className={({isActive})=>isActive?"navigation__link_active navigation__link navigation__link_home":"navigation__link navigation__link_home"} onClick={onClose}>{'Главная'}</NavLink></li>
      <li className="navigation__list navigation__list_movies"><NavLink to='/movies' className={({isActive})=>isActive?"navigation__link_active navigation__link navigation__link_movies":"navigation__link navigation__link_movies"} onClick={onClose}>{'Фильмы'}</NavLink></li>
        <li className="navigation__list"><NavLink to='/saved-movies' className={({isActive})=>isActive?"navigation__link_active navigation__link navigation__link_saved":"navigation__link navigation__link_saved"} onClick={onClose}>{'Сохраненные фильмы'}</NavLink></li>
        </ul>
      </li>
      <li className="navigation__block"><Link to='/profile' className="navigation__link navigation__link navigation__link_account" onClick={onClose}>{'Аккаунт'}<div className="navigation__account"><img className="navigation__icon" src={imageAccount} alt="Значок аккаунта" /></div></Link></li>
    </ul >
  );
}

export default Navigation;