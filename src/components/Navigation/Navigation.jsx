import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import LogoProfile from "../../images/profile.svg";

export default function Navigation({ handleClose }) {
  function handleCloseOverlay(evt) {
    if (evt.target.classList.contains("navigation")) {
      return handleClose();
    }
  }

  return (
    <section className="navigation" onClick={handleCloseOverlay}>
      <div className="navigation__container">
      <button
        className="navigation__close"
        type="button"
        onClick={handleClose}
      />
      <ul className="navigation__list">
        <li>
          <Link className="navigation__link" to="/" onClick={handleClose}>
            Главная
          </Link>
        </li>
        <li>
          <Link className="navigation__link" to="/movies" onClick={handleClose}>
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            className="navigation__link"
            to="/saved-movies"
            onClick={handleClose}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <Link
        to={"/profile"}
        className="navigation__profile"
        onClick={handleClose}
      >
        Аккаунт
        <img
          src={LogoProfile}
          className="navigation__profileButton"
          alt="Логотип профиля"
        />
      </Link>
      </div>
    </section>
  );
}
