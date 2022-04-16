import './AboutMe.css';

function AboutMe() {
  return (
    <section className="student">
      <h1 className="about__title student__title"><a name="student"></a>Студент</h1>
      <div className="student__content">
        <div className="student__resume">
          <p className="student__name">Ольга Григель</p>
          <p className="student__about">Фронтенд-разработчик, 38 лет</p>
          <p className="student__caption">Я живу в Калининградской области, закончила экономический факультет в ЮУрГУ (г. Челябинск). У меня есть муж и сын. Я люблю путешествовать, читать и выращивать цветы. После окончания университета с 2005 года работала в банковской сфере. С апреля 2021 года увлеклась веб-разработкой. На данный момент заканчиваю курсы в Яндекс.Практикум, пишу код дипломной работы и начинаю искать работу по новой профессии.</p>
          <ul className="student__links">
            <li className="student__link"><a target="_blank" className="student__text" href='https://vk.com/ogrigel'>Vk</a></li>
            <li className="student__link"><a target="_blank" className="student__text" href='https://github.com/Olga-Grigel'>Github</a></li>
          </ul>
        </div>
        <div className="student__foto"></div>
      </div>
    </section>
  );
}

export default AboutMe;