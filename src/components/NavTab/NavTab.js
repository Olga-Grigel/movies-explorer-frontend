import './NavTab.css';

function NavTab() {
  return (
    <section className='nav'>
    <p className='nav__text'><a className='nav__link' href="#about">О проекте</a></p>
    <p className='nav__text'><a className='nav__link' href="#technology">Технологии</a></p>
    <p className='nav__text'><a className='nav__link' href="#student">Студент</a></p>
  </section>
  );
}

export default NavTab;