import './HeaderAuth.css';
import { Link } from 'react-router-dom';
import imageLogo from '../../images/logo.svg';

function HeaderAuth({text}) {
  return (
    <header className="headerauth">
        <Link to='/' className="headerauth__logo_link"><img className="headerauth__logo" src={imageLogo} alt="Логотип" /></Link>
        <p className="headerauth__text">{text}</p>
    </header>
  );
}

export default HeaderAuth;