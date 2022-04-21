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
import FormAuth from '../FormAuth/FormAuth';
import useFormWithValidation from '../../utils/FormValidator';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate()
  const [calcMovies, setCalcMovies] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [moviesFiltered, setMoviesFiltered] = React.useState([]);
  const [infoTooltip, setInfoTooltip] = React.useState({ onStatus: false, title: "" });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState({});
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    handleTokenCheck('/')
  }, [])
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

  React.useEffect(() => {
    mainApi.getInitialProfile()
      .then((data) => {
        setcurrentUser(data);
        console.log(data)
      })
      .catch(err => console.log(`Ошибка: ${err.status}`))
  }, [currentUser]);

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
        console.log(movies)
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
          //setTimeout(handleTokenCheck('/'), 6000);
          setTimeout(navigate('/movies'), 6000);
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
    console.log(data)
    const {email, password}=data
    console.log({email, password})
    auth
      .signin(data)
      .then(res => {
        console.log(res);
        if (res?.data._id) {
          localStorage.setItem('jwt', res?.data._id);
          console.log(localStorage.getItem('jwt', res?.data._id))
          setcurrentUser(res.data);
          setLoggedIn(true);
          //setTimeout(handleTokenCheck('/'), 9000);
          navigate('/movies');
        }
      })
      .catch(() => {
        setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
      })
  }
  //обновление профиля(изменение данных)
  function handleUpdateUser(data) {
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
    // проверяем, есть ли этот фильм в нашей базе сохраненных (проверяем по id фильма и id пользователя)
    console.log(movie)
    //const isSaved = movie.id.some(i => i === currentUser._id);
    // Отправляем запрос в API и сохраняем фильм в нашу базу данных
    //if (!isSaved) {
      mainApi.savedMovie(movie)
      .then((movie)=>{
        console.log(movie)
      })
        // .then((newCard) => {
        //   setMovies((prewMovies) => prewMovies.map((m) => m.id === movie.id ? newCard : m));
        // })
        .catch(err => console.log(`Ошибка: ${err.status}`));
    //}
  //   mainApi.deleteMovie(movie.id)
  //     .then((newCard) => {
  //       setMovies((prewMovies) => prewMovies.map((m) => m.id === movie.id ? newCard : m));
  //     })
  //     .catch(err => console.log(`Ошибка: ${err.status}`));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              buttonDisabled={"on"}
              onMenu={() => setIsMenuOpen(true)}
              onSavedMovie={(movie)=>{handleSavedMovie(movie)}}
            />} />
          {/* } /> */}
          {/* <ProtectedRoute
          loggedIn={loggedIn}
          component={ */}
          <Route path="/saved-movies" element={
            <SavedMovies
              movies={moviesFiltered}
              handleSearch={handleSearch}
              buttonDisabled={"of"}
              onMenu={() => setIsMenuOpen(true)}
            />} />
          {/* } /> */}
          {/* <ProtectedRoute
          loggedIn={loggedIn}
          component={ */}
          <Route path="/profile" element={<Profile
            onUpdateUser={handleUpdateUser}
          />} />
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
