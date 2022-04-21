import './Menu.css';
import Navigation from '../Navigation/Navigation';
import React from 'react';

function Menu({isOpen, onClose, onPopupClick}) {
  return (
    <section className={`menu ${isOpen ? 'menu_opened' : ''}`} onClick={onPopupClick}>
      <button type="button" className='menu__close' onClick={onClose}></button>
      <Navigation
      />
    </section>
  );
}

export default Menu;