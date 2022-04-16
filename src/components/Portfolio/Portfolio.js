import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__subtitle">Портфолио</p>
      <ul className="portfolio__proects">
        <li className="portfolio__list"><a target="_blank" href="https://github.com/Olga-Grigel/how-to-learn" className="portfolio__proect"><p className="portfolio__text">Статичный сайт</p><p className="portfolio__arrow">↗</p></a></li>
        <li className="portfolio__list"><a target="_blank" href="https://github.com/Olga-Grigel/russian-travel" className="portfolio__proect"><p className="portfolio__text">Адаптивный сайт</p><p className="portfolio__arrow">↗</p></a></li>
        <li className="portfolio__list"><a target="_blank" href="https://github.com/Olga-Grigel/express-mesto-gha" className="portfolio__proect"><p className="portfolio__text">Одностраничное приложение</p><p className="portfolio__arrow">↗</p></a></li>
      </ul>
    </section>
  );
}

export default Portfolio;