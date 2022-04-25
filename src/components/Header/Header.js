import './Header.css';
import { Link } from 'react-router-dom';
import imageLogo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import imageBurger from '../../images/burger.svg';

function Header({onMenu}) {
  return (
    <header className="header">
      <Link to='/' className="header__logo_link"><img className="header__logo" src={imageLogo} alt="Логотип" /></Link>
      <div className="header__navigation_long">
        <Navigation />
      </div>
      <div className="header__navigation_burger">
        <button className="header__navigation__button" onClick={onMenu}></button>
      </div>
    </header>
  );
}

export default Header;