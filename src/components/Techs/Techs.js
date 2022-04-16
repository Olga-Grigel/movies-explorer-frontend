import './Techs.css';

function Techs() {  
  return (
    <section className="technology">
        <h1 className="about__title technology__title"><a name="technology"></a>Технологии</h1>
        <div className="technology__content">
          <h2 className="technology__text">7 технологий</h2>
          <p className="technology__caption">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="technology__icons">
            <li className="technology__icon">HTML</li>
            <li className="technology__icon">CSS</li>
            <li className="technology__icon">JS</li>
            <li className="technology__icon">React</li>
            <li className="technology__icon">Git</li>
            <li className="technology__icon">Express.js</li>
            <li className="technology__icon">mongoDB</li>
          </ul>
        </div>
      </section>
  );
}

export default Techs;