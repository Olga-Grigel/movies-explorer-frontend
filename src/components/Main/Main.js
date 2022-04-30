import './Main.css';
import React from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate()
  //проверяет есть ли токен в локальном хранилище, если есть, то переводит на страницу "movies"

  return (
    <main className="landing">
      <Promo
      />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main >
  );
}

export default Main;