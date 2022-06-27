export class Api {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка ${res.status}`
    );
  }

  getOriginalCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name:data["inputPlace"], link:data["inputLink"]})
    }).then(this._checkResponse);
  }

  deleteMyCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getOriginalProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name:data["inputName"], about:data["inputJob"]}),
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar:data["inputAvatar"]}
    )
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "fbc65fd2-5c16-4a99-9542-a08cde72dc8c",
    "content-Type": "application/json",
  },
});  