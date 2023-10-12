class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._checkResponse = (res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserToken = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  register = (name, email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._checkResponse);
  };

  login = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  };

  getInfoUser(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  // changeProfile(name, email, token) {
  //   return fetch(`${this._url}/users/me`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //     }),
  //   }).then(this._checkResponse);
  // }
}

const mainApi = new MainApi({
  // baseUrl: "BigBaseMoviesBack.nomoredomainsicu.ru",
  baseUrl: "http://localhost:3000",
});
export default mainApi;
