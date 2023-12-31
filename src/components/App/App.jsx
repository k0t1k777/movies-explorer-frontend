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
import Preloader from "../Preloader/Preloader";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

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
    if (!token) {
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
      console.log("пользователь вышел");
      return;
    }

    const token = getStoredToken();
    console.log("токен перед запросом пользователя", token);

    if (storedLoggedIn) {
      Promise.all([MainApi.getUserToken(token), MainApi.getMovies(token)])
        .then(([infoUser, infoMovies]) => {
          setCurrentUser(infoUser);
          setSavedMovies(infoMovies);

          // if (infoMovies.length !== 0) {
          //   setSavedMovies(infoMovies)
          // } else {
          //   setSavedMovies(infoMovies);
          // }
        })
        .catch((error) => console.error(`Ошибка ${error}`));
    }
  }, [loggedIn]);

  // Обработка лайков
  function handleMovieLike(movie) {
    const token = getStoredToken();
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id);

    if (savedMovie) {
      MainApi.deleteMovie(savedMovie._id, token)
        .then(() => {
          const updatedSavedMovies = savedMovies.filter(
            (item) => item._id !== savedMovie._id
          );
          setSavedMovies(updatedSavedMovies);
        })
        .catch((error) => console.error(`Ошибка удаления фильма: ${error}`));
    } else {
      MainApi.saveMovie(
        {
          country: movie.country || "Неизвестно",
          director: movie.director || "Неизвестно",
          duration: movie.duration || 0,
          year: movie.year || "Неизвестно",
          description: movie.description || "Нет описания",
          image: "https://api.nomoreparties.co${movie.image.url}",
          trailer: movie.trailerLink || "https://www.youtube.com/",
          thumbnail:
            "https://api.nomoreparties.co${movie.image.formats.thumbnail.url}",
          movieId: movie.id,
          nameRU: movie.nameRU || "Неизвестно",
          nameEN: movie.nameEN || "Неизвестно",
        },
        token
      )
        .then((data) => {
          setSavedMovies([data, ...savedMovies]);
        })
        .catch((error) => console.error(`Ошибка сохранения фильма: ${error}`));
    }
  }

  // Функция добавления и удаления фильма:

  // function handleMovieDelete(movie) {
  //   const token = getStoredToken();
  //   const savedMovie = savedMovies.find((item) => item.movieId === movie.movieId);
  
  //   MainApi.deleteMovie(savedMovie._id, token)
  //     .then(() => {
  //       const updatedSavedMovies = savedMovies.filter(
  //         (item) => item._id !== savedMovie._id
  //       );
  //       setSavedMovies(updatedSavedMovies);
  //     })
  //     .catch((error) => console.error(`Ошибка удаления фильма: ${error}`));
  // }

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

  function handleLogin(email, password) {
    setIsLoading(true);
    MainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          console.log("токен есть, запоминаем сотояние пользоветля");
          storeLoggedIn(true);
          const storedLoggedIn = getStoredLoggedIn();
          console.log("и оно ", storedLoggedIn);
          setLoggedIn(true);
          console.log("а еще мы запомнили значение токена");
          storeToken(data.token);
          setIsLoading(false);
          navigate("/movies");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function handleExit() {
    // очищаем локальную базу
    localStorage.clear();
    setLoggedIn(false);
    setEmail("");
    navigate("/signup");
  }

  // Profile

  function handleChangeProfile(name, email) {
    const token = getStoredToken();
    MainApi.changeProfile(name, email, token)
      .then((data) => {
        const updatedUser = {
          name: data.name,
          email: data.email,
        };
        setCurrentUser(updatedUser);
      })
      .catch((error) => {
        console.log(`Ошибка обновления информации о пользователе: ${error}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="page">
        {isLoading ? (
          <Preloader />
        ) : (
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
                  handleChangeProfile={handleChangeProfile}
                  exit={handleExit}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={Movies}
                  handleMovieLike={handleMovieLike}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  component={SavedFilms}
                  loggedIn={loggedIn}
                  handleMovieLike={handleMovieLike}
                />
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        )}
      </main>
    </CurrentUserContext.Provider>
  );
}

export default App;
