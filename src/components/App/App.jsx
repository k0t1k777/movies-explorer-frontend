import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/contexts";
import MainApi from "../../utils/MainApi.js";
import "./App.jsx";
import Main from "../Main/Main.jsx";
import "./App.css";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import Error404 from "../Error404/Error404.jsx";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedFilms from "../SavedFilms/SavedFilms.jsx";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [currentUser, setCurrentUser] = useState({});
  // const [isLoginLoading, setIsLoginLoading] = useState(false);

  // управление сохраненным состоянием авторизации
  function getStoredLoggedIn() {
    const storedisLoggedIn = localStorage.getItem("isLoggedIn");
    return storedisLoggedIn;
  }

  function storeLoggedIn(value) {
    localStorage.setItem("isLoggedIn", value);
  }

  // управление сохраенным состоянием токена
  function getStoredToken() {
    const storedToken = localStorage.getItem("jwt");
    return storedToken;
  }

  function storeToken(value) {
    console.log(value);
    localStorage.setItem("jwt", value);
  }

  // при каждой отрисовке страницы проверяем наличие сохраненного токена
  // и если таковой есть, ставим в память состояние loggedIn === true
  useEffect(() => {
    const token = getStoredToken();
    console.log("получили сохраненный токен", token);
    if (!token) {
      console.log("Токен null или undefinded, уходим отсюда");
      return;
    }

    console.log("токен есть, запоминаем сотояние пользоветля");
    storeLoggedIn(true);
    const storedLoggedIn = getStoredLoggedIn();
    console.log("и оно ", storedLoggedIn);

    // вот тут меняется состояние loggenIn на true - и мы запускаем useEffect ниже!
    setLoggedIn(true);
  }, []);

  // при смене состояния loggedIn проверяем, если оно false - ничего не делаем
  // а если оно true, то лезем обновлять ниформацию о currecntUser
  useEffect(() => {
    const storedLoggedIn = getStoredLoggedIn();
    console.log(
      "получили состояние пользователя из памяти и оно",
      storedLoggedIn
    );

    if (!storedLoggedIn) {
      console.log("пользователь не залогинен, увы, уходим отсюда");
      return;
    }

    const token = getStoredToken();
    console.log("токен перед запросом пользователя", token);

    if (storedLoggedIn) {
      Promise.all([MainApi.getInfoUser(token)])
        .then(([infoUser]) => {
          setCurrentUser(infoUser);
        })
        .catch((error) => console.error(`Ошибка ${error}`));
    }
  }, [loggedIn]);

  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((data) => {
        if (data) {
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(`Ошибка регистрации ${error}`);
      });
  }

  function handleExit() {
    // очищаем локальную базу
    localStorage.clear();
    setLoggedIn(false);
    setEmail("");
    navigate("/signup");
  }

  function handleLogin(email, password) {
    MainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          console.log("мы вошли! и у нас есть токен", data.token);

          console.log("токен есть, запоминаем сотояние пользоветля");
          storeLoggedIn(true);
          const storedLoggedIn = getStoredLoggedIn();
          console.log("и оно ", storedLoggedIn);

          setLoggedIn(true);
          console.log("а еще мы запомнили значение токена");
          storeToken(data.token);

          navigate("/movies");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Profile

  // const handleChangeProfile = (data) =>
  //   MainApi.changeProfile(data)
  //     .then(() => {
  //       setCurrentUser({ ...currentUser, name: data.name, email: data.email });
  //     })
  //     .catch((error) => console.log(error));

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register email={email} onRegister={handleRegister} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                // handleChangeProfile={handleChangeProfile}
                exit={handleExit}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/movies"
            element={<ProtectedRoute component={Movies} />}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute component={SavedFilms} loggedIn={loggedIn} />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default App;
