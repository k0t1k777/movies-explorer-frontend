import "./SavedFilms.css";
import Movies from "../../../src/images/test.png";
import Movies2 from "../../../src/images/test2.png";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function SavedFilms() {
  return (
    <>
      <Header />
      <SearchForm />
      <main className="savedFilms">
        <ul className="savedFilms__list">
          <li className="savedFilms__container">
              <img src={Movies} className="savedFilms__films" alt="Фильм" />
              <div className="savedFilms__wrapper">
                <h2 className="savedFilms__title">33 слова о дизайне</h2>
                <button className="savedFilms__save" type="button" />
              </div>
              <p className="savedFilms__time">1ч 47м</p>
          </li>
          <li className="savedFilms__container">
              <img src={Movies2} className="savedFilms__films" alt="Фильм" />
              <div className="savedFilms__wrapper">
                <h2 className="savedFilms__title">
                  Киноальманах «100 лет дизайна»
                </h2>
                <button className="savedFilms__save" type="button" />
              </div>
              <p className="savedFilms__time">1ч 47м</p>
          </li>
          <li className="savedFilms__container">
              <img src={Movies} className="savedFilms__films" alt="Фильм" />
              <div className="savedFilms__wrapper">
                <h2 className="savedFilms__title">33 слова о дизайне</h2>
                <button className="savedFilms__save" type="button" />
              </div>
              <p className="savedFilms__time">1ч 47м</p>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
