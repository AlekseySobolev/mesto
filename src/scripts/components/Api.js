export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  updateProfile({ name, info }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: info
      })
    })
      .then(res => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
       .then(res => {
        return this._getResponseData(res);
       })
       .catch((err) => {
         console.log(err); // выведем ошибку в консоль
       });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  changeLikeCardStatus(cardId, like){
    const method = like ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  }

  updateAvatar(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

}