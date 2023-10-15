class MoviesApi {
  constructor(baseUrl) {
    this._url = baseUrl;
    this._checkResponse = (res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", 
      }
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
export default moviesApi;
