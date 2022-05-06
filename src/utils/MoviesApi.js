class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  checkResponse(res) {
    if (res.ok) { return res.json() } else { return Promise.reject(res) }
  }

  getInitialMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this.checkResponse(res))
  };
}

const api = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;