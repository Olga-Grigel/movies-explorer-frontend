import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
//import ProtectedRoute from '../ProtectedRoute';
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
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';

function App() {
  const navigate = useNavigate()
  const [calcMovies, setCalcMovies] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [moviesFiltered, setMoviesFiltered] = React.useState([]);
  const [infoTooltip, setInfoTooltip] = React.useState({ onStatus: false, title: "" });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState({});

  // React.useEffect(() => {
  //   handleTokenCheck('/')
  // }, [])

  const handleTokenCheck = (path) => {
    if (localStorage.getItem('jwt')) {
      auth
        .checkToken()
        .then(res => {
          if (res) {
            setLoggedIn(true)
            localStorage.setItem('email', res.email);
            navigate(path)
          }
        })
        .catch(err => console.log(`Ошибка: ${err.status}`))
    }
  }

  //запускаю подсчет карточек
  React.useEffect(() => {
    handleMoviesCalc();
  }, [])

  //устанавливает сколько карточек будет отражаться при разном размере экрана
  function handleMoviesCalc() {
    if (window.innerWidth < 449) {
      return setCalcMovies(5);
    }
    else if (window.innerWidth < 949) {
      return setCalcMovies(8);
    }
    return setCalcMovies(12);
  };

  //функция создания списка карточек
  function moviesList(arrayMovies) {
    handleMoviesCalc()
    return arrayMovies.slice(0, calcMovies);
  };

  //функция поиска карточек
  const handleSearch = (e) => {
    e.preventDefault();
    moviesApi.getInitialMovies()
      .then((movies) => {
        setMovies(movies);
        setMoviesFiltered(moviesList(movies))
        // window.addEventListener("resize", () => { setMovies(moviesList(movies)) });        
        // return () => window.removeEventListener("resize", () => { setMovies(moviesList(movies)) });

      })
      .catch(err => alert(`Ошибка: ${err.status}`))
  }

  React.useEffect(() => {
    const handleScreenWidth = () => {
      setMoviesFiltered(moviesList(movies))
    };
    window.addEventListener("resize", handleScreenWidth);
    return () => window.removeEventListener("resize", handleScreenWidth);
  }, [movies, calcMovies]);

  const handleInfoTooltipSubmitRegister = (data) => {
    auth
      .signup(data)
      .then(res => {
        if (res.status !== 400) {
          setInfoTooltip({ onStatus: true, title: "Вы успешно зарегистрировались!" })
          //setTimeout(handleTokenCheck('/'), 2000);
        } else {
          setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
        }
      })
      .catch(() => {
        setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
      })
  }

  const handleInfoTooltipSubmitLogin = (data) => {
    if (!data.email || !data.password) {
      return setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
    }
    auth
      .signin(data)
      .then(res => {
        if (res?.data._id) {
          localStorage.setItem('jwt', res?.data._id);
          setcurrentUser(res.data);
          setLoggedIn(true);
          //handleTokenCheck('/');
        }
      })
      .catch(() => {
        setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
      })
  }
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main />} />
        {/* <ProtectedRoute
          loggedIn={loggedIn}
          component={ */}
        <Route path="/movies" element={
          <Movies
            movies={moviesFiltered}
            handleSearch={handleSearch}
          />} />
        {/* } /> */}
        {/* <ProtectedRoute
          loggedIn={loggedIn}
          component={ */}
        <Route path="/saved-movies" element={
          <SavedMovies
            movies={moviesFiltered}
            handleSearch={handleSearch}
          />} />
        {/* } /> */}
        {/* <ProtectedRoute
          loggedIn={loggedIn}
          component={ */}
        <Route path="/profile" element={<Profile />} />
        {/* } /> */}
        <Route path="/signin" element={<Login
          submitLogin={handleInfoTooltipSubmitLogin}
          infoTooltip={infoTooltip}
        />} />
        <Route path="/signup" element={<Register
          submitRegister={handleInfoTooltipSubmitRegister}
          infoTooltip={infoTooltip}
        />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
