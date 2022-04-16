import './Header.css';
import { Link } from 'react-router-dom';
import imageLogo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import imageBurger from '../../images/burger.svg';

function Header() {
  return (
    <header className="header">
      <Link to='/' className="header__logo_link"><img className="header__logo" src={imageLogo} alt="Логотип" /></Link>
      <div className="header__navigation_long">
        <Navigation />
      </div>
      <div className="header__navigation_burger">
        <Link to='/main' className="navigation__burger_link"><img className="navigation__burger" src={imageBurger} alt="Картинка меню" /></Link>
      </div>
    </header>
  );
}

export default Header;