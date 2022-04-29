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
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate()
  const [calcMovies, setCalcMovies] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [moviesFiltered, setMoviesFiltered] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesFilteredByWordAndChekbox, setMoviesFilteredByWordAndChekbox] = React.useState([]);
  const [moviesFilteredSaved, setMoviesFilteredSaved] = React.useState([]);
  const [infoTooltip, setInfoTooltip] = React.useState({ onStatus: false, title: "" });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState({});
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [clickSearch, setClickSearch] = React.useState(false);
  const [invalidSearch, setInvalidSearch] = React.useState({ onStatus: false, title: "" });
  const [invalidSearchSavedMovies, setInvalidSearchSavedMovies] = React.useState({ onStatus: false, title: "" });
  const [onPreloader, setOnPreloader] = React.useState(false);
  const [inactiveButtonMore, setInactiveButtonMore] = React.useState(true);

  const handleTokenCheck = (path) => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
      navigate(path);
    }
  }

  function closePopups() {
    setIsMenuOpen(false);
  }

  //получаем данные профиля и свои сохраненные фильмы
  React.useEffect(() => {
    setOnPreloader(true);
    Promise.all([mainApi.getInitialProfile(), mainApi.getSavedMovies()])
      .then((data) => {
        setcurrentUser(data[0]);
        const myMovies = data[1].filter((movie) => movie.owner === localStorage.getItem('jwt'))
        setSavedMovies(myMovies)
        setOnPreloader(false);
      })
      .catch(err => {
        setInvalidSearchSavedMovies({ onStatus: true, title: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!" })
        return console.log(`Ошибка: ${err.status}`)
      })
  }, []);

  //поменять навигацию!!!
  //проверяет есть ли токен в локальном хранилище, если есть, то переводит на страницу "movies"
  React.useEffect(() => {
    handleTokenCheck('/movies')
  }, [])

  //закрывает меню с помощью Esc
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

  //сохранение карточки
  function handleSavedMovie(movie) {
    mainApi.savedMovie(movie)
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies])
      })
      .catch(err => console.log(`Ошибка: ${err.status}`));
  }

  //удаление фильма
  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies((prewSavedMovies) => prewSavedMovies.filter((m) => m._id !== movieId));
      })
      .catch(err => console.log(`Ошибка: ${err.status}`));
  }

  //закрывает модальное окно по клику на оверлей
  function handlePopupClick(event) {
    if (event.target === event.currentTarget) {
      closePopups()
    }
  }

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

  //запуск подсчета карточек
  React.useEffect(() => {
    handleMoviesCalc();
  }, [])

  //функция создания списка карточек
  function moviesList(arrayMovies) {
    handleMoviesCalc()
    return arrayMovies.slice(0, calcMovies);
  };

  //Функция для кнопки "Ещё"
  function handleMoviesListAddCardsMore() {
    if (window.innerWidth < 449) {
      setCalcMovies(calcMovies + 2)
      return (calcMovies + 2)
    }
    else if (window.innerWidth < 949) {
      setCalcMovies(calcMovies + 2)
      return (calcMovies + 2)
    }
    setCalcMovies(calcMovies + 3)
    return (calcMovies + 3)
  };

  //нужно доделать логику инактивации кнопки Ещё
  function addMovies() {
    const newCalcMovies = handleMoviesListAddCardsMore()
    const newMoviesFiltered = moviesFilteredByWordAndChekbox.slice(0, newCalcMovies)
    setMoviesFiltered(newMoviesFiltered);
    (newMoviesFiltered.length === moviesFilteredByWordAndChekbox.length) ? setInactiveButtonMore(true) : setInactiveButtonMore(false);
  };
  //функции поиска и фильтрация фильмов
  function handleMowiesFilterByWordAndChekbox(moviesArray, word, checkbox) {
    const moviesFilterByWord = moviesArray.filter((m) => (m.nameRU.includes(word) || m.nameEN?.includes(word)))
    if (checkbox) {
      return moviesFilterByWord.filter((m) => (m.duration < 41))
    } return moviesFilterByWord
  }

  //поиск и фильтрация фильмов в общей базе данных
  const handleSearchMovies = (word, checkbox) => {
    setOnPreloader(true);
    if (!word) {
      return setInvalidSearch({ onStatus: true, title: "Нужно ввести ключевое слово!" })
    }
    setInvalidSearch(false);
    moviesApi.getInitialMovies()
      .then((movies) => {
        let moviesArray = handleMowiesFilterByWordAndChekbox(movies, word, checkbox)
        setMovies(movies);
        setMoviesFilteredByWordAndChekbox(moviesArray)
        setMoviesFiltered(moviesList(moviesArray));
        setOnPreloader(false);
        (calcMovies < moviesArray.length) ? setInactiveButtonMore(false) : setInactiveButtonMore(true);
        localStorage.setItem("movies", JSON.stringify(moviesArray))
        localStorage.setItem("checkbox", JSON.stringify(checkbox))
        localStorage.setItem("word", word)
        if (moviesList.length === 0) {
          return setInvalidSearch({ onStatus: true, title: "Ничего не найдено!" })
        }
        return setInvalidSearch({ onStatus: false, title: "" })
      })
      .catch(err => {
        setInvalidSearch({ onStatus: true, title: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!" })
        return console.log(`Ошибка: ${err.status}`)
      });
  }

  //функция поиска и фильтрация сохраненных фильмов
  const handleSearchSavedMovies = (word, checkbox) => {
    let savedMoviesList = handleMowiesFilterByWordAndChekbox(savedMovies, word, checkbox)
    setClickSearch(true);
    setMoviesFilteredSaved(moviesList(savedMoviesList));
    if (savedMoviesList.length === 0) {
      return setInvalidSearchSavedMovies({ onStatus: true, title: "Ничего не найдено!" })
    }
    return setInvalidSearchSavedMovies({ onStatus: false, title: "" })
  }

  //меняет количество карточек на экране в зависимости от ширины экрана
  React.useEffect(() => {
    const handleScreenWidth = () => {
      setMoviesFiltered(moviesList(moviesFilteredByWordAndChekbox))
    };
    window.addEventListener("resize", handleScreenWidth);
    return () => window.removeEventListener("resize", handleScreenWidth);
  }, [movies, calcMovies]);

  //регистрация
  const handleInfoTooltipSubmitRegister = (data) => {
    auth
      .signup(data)
      .then(res => {
        if (res.status !== 400) {
          localStorage.setItem('jwt', res._id);
          setcurrentUser(res);
          setLoggedIn(true);
          navigate('/movies');
          setInfoTooltip({ onStatus: false })
        } else {
          setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
        }
      })
      .catch(() => {
        setInfoTooltip({ onStatus: true, title: "Что-то пошло не так..." })
      })
  }

  //логин
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
          setInfoTooltip({ onStatus: false })
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
      })
      .catch(err => console.log(`Ошибка: ${err.status}`))
  }

  //выход
  const handleLogout = (event) => {
    auth
      .signout()
      .then(res => {
        event.preventDefault()
        localStorage.removeItem('jwt')
        localStorage.removeItem('movies')
        localStorage.removeItem('checkbox')
        localStorage.removeItem('word')
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
                  movies={moviesFiltered}
                  handleSearch={handleSearchMovies}
                  onMenu={() => setIsMenuOpen(true)}
                  handleDeleteMovie={handleDeleteMovie}
                  handleSavedMovie={handleSavedMovie}
                  savedMovies={savedMovies}
                  currentUser={currentUser}
                  invalidSearch={invalidSearch}
                  onPreloader={onPreloader}
                  addMovies={addMovies}
                  inactiveButtonMore={inactiveButtonMore}
                />} />
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <SavedMovies
                  movies={(!clickSearch) ? savedMovies : moviesFilteredSaved}
                  handleSearch={handleSearchSavedMovies}
                  onMenu={() => setIsMenuOpen(true)}
                  handleDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                  currentUser={currentUser}
                  invalidSearchSavedMovies={invalidSearchSavedMovies}
                  onPreloader={onPreloader}
                  
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
                  currentUser={currentUser}
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
