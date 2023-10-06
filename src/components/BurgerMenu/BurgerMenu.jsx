import { useState } from "react";
import "./BurgerMenu.css";
import Navigation from "../Navigation/Navigation";

export default function BurgerMenu() {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  function openBurgerMenu() {
    setIsBurgerActive(true);
  }

  function closeBurgerMenu() {
    setIsBurgerActive(false);
  }
  return (
    <>
      <button
        className="burgerMenu"
        type="button"
        onClick={openBurgerMenu}
      ></button>
      {isBurgerActive ? (
        <Navigation handleClose={closeBurgerMenu} isOpen={isBurgerActive} />
      ) : (
        " "
      )}
    </>
  );
}
