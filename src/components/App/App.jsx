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
    storeLoggedIn(true);
    const storedLoggedIn = getStoredLoggedIn();
    console.log(storedLoggedIn);
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
    // console.log("токен перед запросом пользователя", token);

    if (storedLoggedIn) {
      Promise.all([MainApi.getUserToken(token), MainApi.getMovies(token)])
        .then(([infoUser, infoMovies]) => {
          setCurrentUser(infoUser);
          if (infoMovies && infoMovies.movies) {
            setSavedMovies(infoMovies.movies.reverse());
          }
        })
        .catch((error) => console.error(`Ошибка ${error}`));
    }
  }, [loggedIn]);

  // Фильмы
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

  function toggleAddMovie(data) {
    const isLiked = savedMovies.some((movie) => movie.movieId === data.id);
    if (isLiked) {
      const clickedMovie = savedMovies.find(
        (movie) => movie.movieId === data.id
      );
      if (clickedMovie) {
        handleDeleteMovie(clickedMovie._id);
      }
    } else {
      const token = getStoredToken();
      MainApi.createMovie(token, data)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((error) =>
          console.error(`Ошибка при добавлении фильма ${error}`)
        );
    }
  }

  // Регистрация
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

  // Логин
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

  function handleExit() {
    localStorage.clear();
    setLoggedIn(false);
    setEmail("");
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
                  name="movies"
                  component={Movies}
                  savedMovies={savedMovies}
                  toggleAddMovie={toggleAddMovie}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
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
