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
  const [currentUser, setcurrentUser] = React.useState({});
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [clickSearch, setClickSearch] = React.useState(false);
  const [invalidSearch, setInvalidSearch] = React.useState({ onStatus: false, title: "" });
  const [invalidSearchSavedMovies, setInvalidSearchSavedMovies] = React.useState({ onStatus: false, title: "" });
  const [onPreloader, setOnPreloader] = React.useState(false);
  const [inactiveButtonMore, setInactiveButtonMore] = React.useState(false);

  function closePopups() {
    setIsMenuOpen(false);
  }

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

  //кнопкa Ещё
  const addMovies = () => {
    const newCalcMovies = handleMoviesListAddCardsMore()
    const newMoviesFiltered = moviesFilteredByWordAndChekbox.slice(0, newCalcMovies)
    setMoviesFiltered(newMoviesFiltered);
    (newMoviesFiltered.length === moviesFilteredByWordAndChekbox.length) ? setInactiveButtonMore(false) : setInactiveButtonMore(true);
  };
  //функции поиска и фильтрация фильмов
  function handleMowiesFilterByWordAndChekbox(moviesArray, word, checkbox) {
    const moviesFilterByWord = moviesArray.filter((m) => (m.nameRU.toLowerCase().includes(word.toLowerCase()) || m.nameEN?.toLowerCase().includes(word.toLowerCase())))
    if (checkbox) {
      return moviesFilterByWord.filter((m) => (m.duration < 41))
    } else {
      return moviesFilterByWord
    }
  }

  //поиск и фильтрация фильмов в общей базе данных
  function inactiveButton(boolean) {
    return boolean
  }
  const localStorageMovies = JSON.parse(localStorage.getItem('movies'))
  const localStorageCheckbox = JSON.parse(localStorage.getItem('checkbox'));
  const localStorageWord = localStorage.getItem('word');

  React.useEffect(() => {
    if (localStorage.getItem('movies')) {
      let moviesFilterArray = handleMowiesFilterByWordAndChekbox(localStorageMovies, localStorageWord, localStorageCheckbox);
      (calcMovies < moviesFilterArray.length) ? setInactiveButtonMore(true) : setInactiveButtonMore(false);
      setMoviesFiltered(moviesList(moviesFilterArray));
      setMoviesFilteredByWordAndChekbox(moviesFilterArray)
    } else {
      setMoviesFiltered([]);
    }
  }, [calcMovies])

  const handleSearchMovies = (word, checkbox) => {
    handleMoviesCalc();
    setOnPreloader(true);
    if (!word) {
      return setInvalidSearch({ onStatus: true, title: "Нужно ввести ключевое слово!" })
    }
    setInvalidSearch({ onStatus: false });
    moviesApi.getInitialMovies()
      .then((movies) => {
        let moviesFilterArray = handleMowiesFilterByWordAndChekbox(movies, word, checkbox);
        setMoviesFilteredByWordAndChekbox(moviesFilterArray);
        setMoviesFiltered(moviesList(moviesFilterArray));
        (calcMovies < moviesFilterArray.length) ? setInactiveButtonMore(true) : setInactiveButtonMore(false);
        setMovies(movies);
        localStorage.setItem("movies", JSON.stringify(movies))
        localStorage.setItem("checkbox", JSON.stringify(checkbox))
        localStorage.setItem("word", word)
        setOnPreloader(false);
        if (moviesList(moviesFilterArray).length === 0) {
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
  }, [moviesFiltered, calcMovies]);

  // //функция выводит трейлер фильма по клику на карточку
  // function getMovieTrailerClickingOnCard(movie) {

  // }
  //регистрация
  const handleInfoTooltipSubmitRegister = (data) => {
    auth
      .signup(data)
      .then(res => {
        if (res.status !== 400) {
          localStorage.setItem('jwt', res._id);
          setcurrentUser(res);
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
        setInfoTooltip({ onStatus: true, title: "Данные профиля обновились!" })
      })
      .catch(err => {
        return console.log(`Ошибка: ${err.status}`)
      })
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
        setMoviesFiltered([])
        setCalcMovies(0)
        setInactiveButtonMore(false)
        navigate('/')
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main
            onMenu={() => setIsMenuOpen(true)}
          />} />
          <Route path="/movies" element={
            <ProtectedRoute
              component={
                <Movies
                  moviesFiltered={moviesFiltered}
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
                  setMoviesFiltered={setMoviesFiltered}
                  handleMowiesFilterByWordAndChekbox={handleMowiesFilterByWordAndChekbox}
                  moviesList={moviesList}
                  inactiveButton={inactiveButton}
                  calcMovies={calcMovies}
                  handleMoviesCalc={handleMoviesCalc}
                />} />
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute
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
                  setSavedMovies={setSavedMovies}
                  setOnPreloader={setOnPreloader}
                  setInvalidSearchSavedMovies={setInvalidSearchSavedMovies}
                />} />
          } />
          <Route path="/profile" element={
            <ProtectedRoute
              component={
                <Profile
                  onUpdateUser={handleUpdateUser}
                  onMenu={() => setIsMenuOpen(true)}
                  handleLogout={handleLogout}
                  currentUser={currentUser}
                  setInfoTooltip={setInfoTooltip}
                  infoTooltip={infoTooltip}
                  setcurrentUser={setcurrentUser}
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
          <Route path="/*" element={<NotFound />} />
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
