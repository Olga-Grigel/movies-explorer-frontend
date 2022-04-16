import './Menu.css';
import Navigation from '../Navigation/Navigation';
import React from 'react';

function Menu() {
  return (
    <section className="menu">
      <button type="button" className='menu__close'></button>
      <Navigation
      />
    </section>
  );
}

export default Menu;