export const BasicUrl = "http://localhost:3000";

function cheсkResOk(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserToken = (token) => {
  return fetch(`${BasicUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => cheсkResOk(res));
};

export const register = (name, email, password) => {
  return fetch(`${BasicUrl}/signup`, {
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
  }).then((res) => cheсkResOk(res));
};

export const login = (email, password) => {
  return fetch(`${BasicUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => cheсkResOk(res));
};
