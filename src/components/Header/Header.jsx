import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/logo.svg";
import "./Header.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LogoProfile from "../../images/profile.svg";

export default function Header({ isLoggedIn }) {
      const { pathname } = useLocation();

  return isLoggedIn ? (
    <header
      className={pathname === "/" ? "header" : "header header_theme_dark"}
    >
      <Link to={"/"} className="header__logo">
        <img src={Logo} alt="Логотип на главной странице" />
      </Link>
      <nav className="header__container">
        <Link to={"/signup"} className="header__registration">
          Регистрация
        </Link>
        <Link to={"/signin"} className="header__enter">
          Войти
        </Link>
      </nav>
    </header>
  ) : (
    <header
      className={pathname === "/" ? "header" : "header header_theme_dark"}
    >
      <Link to={"/"} className="header__logo">
        <img src={Logo} alt="Логотип на главной странице" />
      </Link>
      <nav className="header__container header__container_side_left">
        <Link
          to={"/movies"}
          className={
            pathname === "/movies"
              ? "header__nav header__nav_display_none"
              : "header__nav"
          }
        >
          Фильмы
        </Link>
        <Link
          to={"/saved-movies"}
          className={
            pathname === "/saved-movies"
              ? "header__nav header__nav_display-none"
              : "header__nav"
          }
        >
          Сохранённые фильмы
        </Link>
      </nav>

      <Link to={"/profile"} className="header__profile">
        Аккаунт
        <img
          className={
            pathname === "/"
              ? "header__logoProfile"
              : "header__logoProfile header__logoProfile_theme_dark"
          }
          src={LogoProfile}
          alt="Логотип профиля"
        />
      </Link>
      <BurgerMenu />
    </header>
  );
}
