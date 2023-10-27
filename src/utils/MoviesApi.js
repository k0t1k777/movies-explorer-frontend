class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._checkResponse = (res) =>
      res.ok ? res.json() : Promise.reject(res.json());
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
});

export default moviesApi;
