import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about">
        <h1 className="about__title"><a name="about"></a>О проекте</h1>
        <ul className="about__colomns">
          <li className="about__colomn">
            <h2 className="about__text">Дипломный проект включал 5 этапов</h2>
            <p className="about__caption">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about__colomn">
            <h2 className="about__text">На выполнение диплома ушло 5 недель</h2>
            <p className="about__caption">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className="about__duration">
          <li className="about__section about__section_color_one">
            <p className="about__week">1 неделя</p>
          </li>
          <li className="about__section about__section_color_two">
            <p className="about__week">4 недели</p>
          </li>
        </ul>
        <ul className="about__duration">
          <li className="about__section about__section_clear_one">
            <p className="about__theme">Back-end</p>
          </li>
          <li className="about__section about__section_clear_two">
            <p className="about__theme">Front-end</p>
          </li>
        </ul>
      </section>
  );
}

export default AboutProject;