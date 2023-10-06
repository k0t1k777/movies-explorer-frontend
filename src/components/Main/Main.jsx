import "./Main.css";
import Header from "../Header/Header.jsx";
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Tech/Techs";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer.jsx";

export default function Main({A, B}) {
  return (
    <>
      <Header 
        // isBurgerActiv={A}
        // closeBurgerMenu={B}
      />
      <main className="container">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
