import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__content">
          <p className="footer__year">&copy; 2022</p>
          <ul className="footer__links">
            <li className="footer__list"><a className="footer__link" target="_blank" href='https://practicum.yandex.ru'>Яндекс.Практикум</a></li>
            <li className="footer__list"><a className="footer__link" target="_blank" href='https://github.com/Olga-Grigel'>Github</a></li>
            <li className="footer__list"><a className="footer__link" target="_blank" href='https://vk.com/ogrigel'>Vk</a></li>
          </ul>
        </div>
      </footer>
  );
}

export default Footer;