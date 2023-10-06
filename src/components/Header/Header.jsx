import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import BurgerMenu from "../../components/Navigation/BurgerMenu/BurgerMenu";

export default function Header(
  // {
  //   isBurgerActiv,
  //   closeBurgerMenu
  // }
  ) {
  const { pathname } = useLocation();
  // const [isBurgerActiv, setIsBurgerActiv] = useState(false);

  return (
    <header
      className={pathname === "/" ? "header" : "header  header_theme_dark"}
    >
      <Link to={"/"} className="header__logo">
        <img src={Logo} alt="Логотип на главной странице" />
      </Link>
      <Navigation 
        // isOpen={isBurgerActiv}
      />
      <BurgerMenu 
        // isOpen={isBurgerActiv}
        // handleClose={closeBurgerMenu}
      />
      {/* {
        isBurgerActiv
          ? <BurgerMenu handleClose={ closeBurgerMenu } isOpen={ isBurgerActiv }/>
          : ''
      } */}

    </header>
  );
}

