import "./SavedFilms.css";
import Movies from "../../../src/images/test.png";
import Movies2 from "../../../src/images/test2.png";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function SavedFilms() {

  const loggedIn = localStorage.getItem('isLoggedIn')
  console.log('SavedFilms прочитал состояние', loggedIn)

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SearchForm />
      <main className="listOfFilms">
        <ul className="listOfFilms__list">
          <li className="listOfFilms__container">
            <img src={Movies} className="listOfFilms__films" alt="Фильм" />
            <div className="listOfFilms__wrapper">
              <h2 className="listOfFilms__title">33 слова о дизайне</h2>
              <button className="listOfFilms__save listOfFilms__save_pic_x" type="button" />
            </div>
            <p className="listOfFilms__time">1ч 47м</p>
          </li>
          <li className="listOfFilms__container">
            <img src={Movies2} className="listOfFilms__films" alt="Фильм" />
            <div className="listOfFilms__wrapper">
              <h2 className="listOfFilms__title">33 слова о дизайне</h2>
              <button className="listOfFilms__save listOfFilms__save_pic_x" type="button" />
            </div>
            <p className="listOfFilms__time">1ч 47м</p>
          </li>
          <li className="listOfFilms__container">
            <img src={Movies} className="listOfFilms__films" alt="Фильм" />
            <div className="listOfFilms__wrapper">
              <h2 className="listOfFilms__title">33 слова о дизайне</h2>
              <button className="listOfFilms__save listOfFilms__save_pic_x" type="button" />
            </div>
            <p className="listOfFilms__time">1ч 47м</p>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
