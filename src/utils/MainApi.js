import moviesApi from '../utils/MoviesApi';

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getSavedMovies() {
    return fetch(this._url + '/movies', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
    .then(res => moviesApi.checkResponse(res));
  };

  getInitialProfile() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
    .then(res => moviesApi.checkResponse(res));
  };

  sendDataProfile({ name, email }) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(res => moviesApi.checkResponse(res));
  };

  savedMovie(data) {
    return fetch(this._url + '/movies', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        id: data.id,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: "https://api.nomoreparties.co" + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: "https://api.nomoreparties.co" + data.image.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
      .then(res => moviesApi.checkResponse(res));
  };

  deleteMovie(cardId) {
    return fetch(`${this._url}/movies/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => moviesApi.checkResponse(res));
  };
}

const api = new Api({
  url: "https://diplom.nomoredomains.work",
  //url: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;