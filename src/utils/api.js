class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._checkResponse = (res) => (res.ok ? res.json() : Promise.reject());
  }

  getInfoUser(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  // addNewCard(cardData, token) {
  //   return fetch(`${this._url}/cards`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       name: cardData.title,
  //       link: cardData.link,
  //     }),
  //   }).then(this._checkResponse);
  // }

  // addLikes(cardId, token) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //   }).then(this._checkResponse);
  // }

  // removeLikes(cardId, token) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //   }).then(this._checkResponse);
  // }

  // changeLikeCardStatus(cardId, isLiked, token){
  //   if(isLiked){
  //     return this.addLikes(cardId, token);
  //   }
  //   return this.removeLikes(cardId, token);
  // }


  // removeCard(cardId, token) {
  //   return fetch(`${this._url}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //   }).then(this._checkResponse);
  // }
}

const api = new Api({
  // baseUrl: "BigBaseMoviesBack.nomoredomainsicu.ru",
  baseUrl: "http://localhost:3000",
});
export default api;
