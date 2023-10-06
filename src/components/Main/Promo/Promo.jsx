import "./Promo.css";
import LogoPromo from "../../../images/pic__COLOR_landing-logo.png";

export default function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__tittle">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img
        src={LogoPromo}
        className="promo__logo"
        alt="Логотип на главной странице"
      />
    </section>
  );
}
