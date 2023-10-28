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
  const [currentUser, setCurrentUser] = useState({});
  const [authMessage, setAuthMessage] = useState({});
  const [profileMessage, setProfileMessage] = useState({});
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
    localStorage.setItem("jwt", value);
  }

  // при каждой отрисовке страницы проверяем наличие сохраненного токена
  // и если таковой есть, ставим в память состояние loggedIn === true
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      return;
    }
    storeLoggedIn(true);
    setLoggedIn(true);
  }, []);

  // при смене состояния loggedIn проверяем, если оно false - ничего не делаем
  // а если оно true, то обновляем ниформацию о currentUser
  useEffect(() => {
    const storedLoggedIn = getStoredLoggedIn();
    if (!storedLoggedIn) {
      return;
    }
    const token = getStoredToken();
    if (storedLoggedIn) {
      Promise.all([MainApi.getUserToken(token), MainApi.getMovies(token)])
        .then(([infoUser, infoMovies]) => {
          setCurrentUser(infoUser);
          if (infoMovies.length !== 0) {
            setSavedMovies(infoMovies.reverse());
          } else {
            setSavedMovies([]);
          }
        })
        .catch((error) => console.error(`Ошибка ${error}`));
    } else {
      setLoggedIn(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  // Регистрация
  function handleRegister({ name, email, password }) {
    MainApi.register({ name, email, password })
      .then((data) => {
        if (data) {
          handleLogin({ email, password });
        }
      })
      .catch((error) => {
        setAuthMessage({
          text: `Ошибка регистрации ${error}`,
          isSuccess: false,
        });
      })
      .finally(() => setIsLoading(false));
  }

  // Логин
  function handleLogin({ email, password }) {
    MainApi.login({ email, password })
      .then((data) => {
        if (data.token) {
          storeLoggedIn(true);
          setLoggedIn(true);
          storeToken(data.token);
          setAuthMessage({
            text: `Вы успешно вошли!`,
            isSuccess: true,
          });
          navigate("/movies");
        }
      })
      .catch((error) => {
        setAuthMessage({
          text: `Ошибка входа: ${error}`,
          isSuccess: false,
        });
      });
  }

  // Профиль
  function handleChangeProfile(name, email) {
    const token = getStoredToken();
    if (!token) {
      setProfileMessage({
        text: `Ошибка авторизации. Пожалуйста, авторизуйтесь заново.`,
        isSuccess: false,
      });
      return;
    }
    MainApi.changeProfile({ name, email, token })
      .then((data) => {
        const updatedUser = {
          name: data.name,
          email: data.email,
        };
        setCurrentUser(updatedUser);
        setProfileMessage({
          text: `Вы обновили информацию о себе.`,
          isSuccess: true,
        });
      })
      .catch((error) => {
        setProfileMessage({
          text: `Ошибка при обновлении профиля: ${error}`,
          isSuccess: false,
        });
      });
  }

  // Удаление фильмов
  function handleDeleteMovie(deleteMovieId) {
    const token = getStoredToken();
    MainApi.deleteMovie(deleteMovieId, token)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((movie) => {
            return movie._id !== deleteMovieId;
          })
        );
      })
      .catch((error) => console.error(`Ошибка удаления фильма ${error}`));
  }

  // Добавление фильмов
  function toggleAddMovie(data) {
    const isMovieLiked = savedMovies.some((movie) => movie.movieId === data.id);
    if (isMovieLiked) {
      const clickedMovie = savedMovies.find(
        (movie) => movie.movieId === data.id
      );
      if (clickedMovie) {
        handleDeleteMovie(clickedMovie._id);
      }
    } else {
      const token = getStoredToken();
      MainApi.createMovie(data, token)
        .then((res) => {
          setSavedMovies((savedMovies) => [res.data, ...savedMovies]);
        })
        .catch((error) =>
          console.error(`Ошибка при добавлении фильма ${error}`)
        );
    }
  }

  // Выход
  function handleExit() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    navigate("/signup");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/signin"
              element={
                <Login
                  isLoading={isLoading}
                  handleLogin={handleLogin}
                  messageState={[authMessage, setAuthMessage]}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  isLoading={isLoading}
                  handleRegister={handleRegister}
                  messageState={[authMessage, setAuthMessage]}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Profile}
                  handleChangeProfile={handleChangeProfile}
                  exit={handleExit}
                  messageState={[profileMessage, setProfileMessage]}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  name="movies"
                  component={Movies}
                  savedMovies={savedMovies}
                  onToggleAddMovie={toggleAddMovie}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  name="saved-movies"
                  component={SavedFilms}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
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
