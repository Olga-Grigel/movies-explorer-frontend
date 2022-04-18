import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import api from '../../utils/MoviesApi';

function App() {
  const [calcMovies, setCalcMovies] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  

  function handleMoviesCalc() {
    
    if (window.innerWidth < 449) {
      return setCalcMovies(5);
    }
    else if (window.innerWidth < 949) {
      return setCalcMovies(8);
    }
    return setCalcMovies(12);
  };

  function moviesList(arrayMovies) {
    handleMoviesCalc();
    console.log(calcMovies)
    return arrayMovies.slice(0, calcMovies);
  };

  const handleSearch = () => {
    
    api.getInitialCards()
      .then((movies) => {
        debugger;      
        setMovies(moviesList(movies));
        window.addEventListener("resize", () => { setMovies(moviesList(movies)) });        
        return () => window.removeEventListener("resize", () => { setMovies(moviesList(movies)) });
        
      })
      .catch(err => alert(`Ошибка: ${err.status}`))
  }

  React.useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/movies" element={
          <Movies
            movies={movies}
            handleSearch={handleSearch}
          />} />
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
