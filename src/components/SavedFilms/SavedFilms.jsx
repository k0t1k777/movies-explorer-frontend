import "./SavedFilms.css";
import Movies from "../../../src/images/test.png";
import Movies2 from "../../../src/images/test2.png";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function SavedFilms({ handleMovieLike }) {

  const loggedIn = localStorage.getItem('isLoggedIn')
  console.log('SavedFilms прочитал состояние', loggedIn)

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SearchForm />
      <main className="filmsCard">
        <ul className="filmsCard__list">
          <li className="filmsCard__container">
            <img src={Movies} className="filmsCard__films" alt="Фильм" />
            <div className="filmsCard__wrapper">
              <h2 className="filmsCard__title">33 слова о дизайне</h2>
              <button className="filmsCard__save filmsCard__save_pic_x" type="button" />
            </div>
            <p className="filmsCard__time">1ч 47м</p>
          </li>
          <li className="filmsCard__container">
            <img src={Movies2} className="filmsCard__films" alt="Фильм" />
            <div className="filmsCard__wrapper">
              <h2 className="filmsCard__title">33 слова о дизайне</h2>
              <button className="filmsCard__save filmsCard__save_pic_x" type="button" />
            </div>
            <p className="filmsCard__time">1ч 47м</p>
          </li>
          <li className="filmsCard__container">
            <img src={Movies} className="filmsCard__films" alt="Фильм" />
            <div className="filmsCard__wrapper">
              <h2 className="filmsCard__title">33 слова о дизайне</h2>
              <button className="filmsCard__save filmsCard__save_pic_x" type="button" />
            </div>
            <p className="filmsCard__time">1ч 47м</p>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
