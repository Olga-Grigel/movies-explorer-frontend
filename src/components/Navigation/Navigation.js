import './Navigation.css';
import { Link } from 'react-router-dom';
import imageAccount from '../../images/account.svg';

function Navigation() {
  return (
    <ul className="navigation">
      <li className="navigation__block">
        <ul className="navigation__menu">
          <li className="navigation__list"><Link to='/' className="navigation__link navigation__link_home" >{'Главная'}</Link></li>
          <li className="navigation__list navigation__list_movies"><Link to='/movies' className="navigation__link navigation__link_movies navigation__link_active" >{'Фильмы'}</Link></li>
          <li className="navigation__list"><Link to='/saved-movies' className="navigation__link navigation__link_saved" >{'Сохраненные фильмы'}</Link></li>
        </ul>
      </li>
      <li className="navigation__block"><Link to='/profile' className="navigation__link navigation__link navigation__link_account" >{'Аккаунт'}<div className="navigation__account"><img className="navigation__icon" src={imageAccount} alt="Значок аккаунта" /></div></Link></li>
    </ul >
  );
}

export default Navigation;