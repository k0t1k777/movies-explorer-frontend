import "./ListOfFilms.css";
import Movies from "../../../images/test.png";
import Movies2 from "../../../images/test2.png";

export default function ListOfFilms() {
  return (
    <section className="listOfFilms">
      <ul className="listOfFilms__list">
        <li className="listOfFilms__container">
          <img src={Movies} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">33 слова о дизайне</h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 47м</p>
        </li>
        <li className="listOfFilms__container">
          <img src={Movies2} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">
              Киноальманах «100 лет дизайна»
            </h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 3м</p>
        </li>
        <li className="listOfFilms__container">
          <img src={Movies} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">33 слова о дизайне</h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 47м</p>
        </li>
        <li className="listOfFilms__container">
          <img src={Movies} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">33 слова о дизайне</h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 47м</p>
        </li>
        <li className="listOfFilms__container">
          <img src={Movies2} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">
              Киноальманах «100 лет дизайна»
            </h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 3м</p>
        </li>
        <li className="listOfFilms__container">
          <img src={Movies} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">33 слова о дизайне</h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 47м</p>
        </li>{" "}
        <li className="listOfFilms__container">
          <img src={Movies} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">33 слова о дизайне</h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 47м</p>
        </li>
        <li className="listOfFilms__container">
          <img src={Movies2} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">
              Киноальманах «100 лет дизайна»
            </h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 3м</p>
        </li>
        <li className="listOfFilms__container">
          <img src={Movies} className="listOfFilms__films" alt="Фильм" />
          <div className="listOfFilms__wrapper">
            <h2 className="listOfFilms__title">33 слова о дизайне</h2>
            <button className="listOfFilms__save" type="button" />
          </div>
          <p className="listOfFilms__time">1ч 47м</p>
        </li>
      </ul>
    </section>
  );
}
