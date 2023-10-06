import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
// import { useState } from "react";
import LogoProfile from "../../images/profile.svg";

export default function Navigation({ isLoggedIn }) {
  // const [isBurgerActiv, setIsBurgerActiv] = useState(false);

  // function openBurgerMenu() {
  //   setIsBurgerActiv(true);
  // }

  // function closeBurgerMenu() {
  //   setIsBurgerActiv(false);
  // }

  const { pathname } = useLocation();

  return !isLoggedIn ? (
    // <section className="navigation">
        <section className={
          pathname === "/" ? "navigation" : "navigation navigation_theme_dark"
        }>

      <nav className="navigation__container">
        <Link to={"/signup"} className="navigation__registration">
          Регистрация
        </Link>
        <Link to={"/signin"} className="navigation__enter">
          Войти
        </Link>
      </nav>
    </section>
  ) : (
    <nav
      className={
        pathname === "/" ? "navigation" : "navigation navigation_theme_dark"
      }
    >
      <nav className="navigation__container navigation__container_side_left">
        <Link
          to={"/movies"}
          className={
            pathname === "/movies"
              ? "navigation__nav navigation__nav_display_none"
              : "navigation__nav"
          }
        >
          Фильмы
        </Link>
        <Link
          to={"/saved-movies"}
          className={
            pathname === "/saved-movies"
              ? "navigation__nav navigation__nav_display-none"
              : "navigation__nav"
          }
        >
          Сохранённые фильмы
        </Link>
      </nav>

      <Link
        to={"/profile"}
        className="navigation__link-profile"
      >
        Аккаунт
        <img
          className={
            pathname === "/"
              ? "navigation__logoProfile"
              : "navigation__logoProfile navigation__logoProfile_theme_dark"
          }
          src={LogoProfile}
          alt="Логотип профиля"
        />
      </Link>

      <button
        className="navigation__burger-button"
        type="button"
        // onClick={openBurgerMenu}
        // onClick={() => setIsBurgerActiv(!isBurgerActiv)}
        // isOpen={openBurgerMenu}
      ></button>
    </nav>
  );
}
