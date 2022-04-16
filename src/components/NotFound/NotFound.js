import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="error">
      <h2 className="error__number">404</h2>
      <p className="error__text">Страница не найдена</p>
      <p className="error__back" ><Link to='/' className="error__link">Назад</Link></p>
    </div>
  );
}

export default NotFound;