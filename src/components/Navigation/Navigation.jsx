import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
// import { useState } from "react";
import LogoProfile from "../../images/profile.svg";


export default function Navigation() {
  // const [isBurgerActiv, setIsBurgerActiv] = useState(false);

  // function openBurgerMenu() {
  //   setIsBurgerActiv(true);
  // }

  // function closeBurgerMenu() {
  //   setIsBurgerActiv(false);
  // }

  return (
    // <section className="navigation">
    <section className="navigation">
    <button className="navigation__close" type="button" />
    <ul className="navigation__list">
      <li>
        <Link className="navigation__link" to="/">
          Главная
        </Link>
      </li>
      <li>
        <Link className="navigation__link" to="/movies">
          Фильмы
        </Link>
      </li>
      <li>
        <Link className="navigation__link" to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </li>
    </ul>
    <Link to={"/profile"} className="navigation__profile">
    Аккаунт
      <img src={LogoProfile} className="navigation__profileButton" alt="Логотип профиля" />
    </Link>
  </section>
  );
}
