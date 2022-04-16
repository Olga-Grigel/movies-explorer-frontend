import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Menu />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
