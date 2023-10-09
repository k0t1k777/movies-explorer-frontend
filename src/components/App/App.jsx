import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/contexts";
import * as auth from "../../utils/auth.js";
// import api from "../../utils/api.js";

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
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  React.useEffect(() => {
    handleToken();
  }, []);

  function handleToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getUserToken(token)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            handleLoggedIn();
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function handleExit() {
  //   localStorage.removeItem("token");
  //   setLoggedIn(false);
  //   setEmail("");
  //   navigate("/sign-in");
  // }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister}  />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} loggedIn={loggedIn} />}
          />
          <Route
            path="/movies"
            element={<ProtectedRoute component={Movies} loggedIn={loggedIn} />}
          />
          <Route
            path="/saved-movies"
            element={<ProtectedRoute component={SavedFilms} loggedIn={loggedIn} />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default App;
