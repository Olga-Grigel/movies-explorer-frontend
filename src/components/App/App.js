import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
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
import FormAuth from '../FormAuth/FormAuth';
import useFormWithValidation from '../../utils/FormValidator';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate()
  const [calcMovies, setCalcMovies] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [moviesFiltered, setMoviesFiltered] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [infoTooltip, setInfoTooltip] = React.useState({ onStatus: false, title: "" });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState({});
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  // React.useEffect(() => {
  //   savedMovies.forEach((movie)=>mainApi.deleteMovie(movie._id))
  // }, []);

  React.useEffect(() => {
    Promise.all([mainApi.getInitialProfile(), mainApi.getSavedMovies()])
      .then((data) => {
        setcurrentUser(data[0]);
        const myMovies = data[1].filter((movie) => movie.owner === localStorage.getItem('jwt'))
        setSavedMovies(myMovies)
      })
      .catch(err => console.log(`Ошибка: ${err.status}`))
  }, []);

  React.useEffect(() => {
    handleTokenCheck('/movies')
  }, [])

  const handleTokenCheck = (path) => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
      navigate(path);
    }
  }

  function closePopups() {
    setIsMenuOpen(false);
  }

  React.useEffect(() => {
    if (isMenuOpen) {
      function handleEsc(event) {
        if (event.key === 'Escape') {
          closePopups()
        }
      }
      document.addEventListener("keydown", handleEsc)
      return () => {
        document.removeEventListener("keydown", handleEsc)
      }
    }
  }, [isMenuOpen])

  function handlePopupClick(event) {
    if (event.target === event.currentTarget) {
      closePopups()
    }
  }

  //запуск подсчета карточек
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
          localStorage.setItem('jwt', res._id);
          setcurrentUser(res);
          setLoggedIn(true);
          navigate('/movies');
          setInfoTooltip({ onStatus: false})
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
          navigate('/movies');
          setInfoTooltip({ onStatus: false})
        }
      })
      .catch(() => {
        setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
      })
  }
  //обновление профиля(изменение данных)
  function handleUpdateUser(data) {
    console.log(data)
    mainApi.sendDataProfile(data)
      .then(res => {
        setcurrentUser(res);
        //closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err.status}`))
  }

  ////В разработке эта строчка под вопросом 
  //setMovies((prewMovies) => prewMovies.map((m) => m.id === movie.id ? newCard : m));

  function handleSavedMovie(movie) {

    //Нужно доработать сохранение карточки (пока работает не корректно)
    mainApi.savedMovie(movie)
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies])
      })
      .catch(err => console.log(`Ошибка: ${err.status}`));
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies((prewSavedMovies) => prewSavedMovies.filter((m) => m._id !== movieId));
      })
      .catch(err => console.log(`Ошибка: ${err.status}`));
  }

  const handleLogout = (event) => {
    auth
      .signout()
      .then(res => {
        event.preventDefault()
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        navigate('/')
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/movies" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <Movies
                  savedMovies={savedMovies}
                  movies={moviesFiltered}
                  handleSearch={handleSearch}
                  buttonDisabled={"on"}
                  onMenu={() => setIsMenuOpen(true)}
                  handleSavedMovie={handleSavedMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  currentUser={currentUser}
                />} />
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <SavedMovies
                  movies={savedMovies}
                  savedMovies={savedMovies}
                  handleSearch={handleSearch}
                  buttonDisabled={"of"}
                  onMenu={() => setIsMenuOpen(true)}
                  handleSavedMovie={handleSavedMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  currentUser={currentUser}
                  selector={"element__button"}
                />} />
          } />
          <Route path="/profile" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <Profile
                  onUpdateUser={handleUpdateUser}
                  onMenu={() => setIsMenuOpen(true)}
                  handleLogout={handleLogout}
                />} />
          } />
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
        <Menu
          isOpen={isMenuOpen}
          onClose={closePopups}
          onPopupClick={handlePopupClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
