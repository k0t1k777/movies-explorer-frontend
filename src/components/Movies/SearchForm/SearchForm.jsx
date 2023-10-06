import "./SearchForm.css";
import PicSearch from "../../../images/find.svg";

export default function SearchForm() {
  return (
    <section className="findFilms">
      <form className="findFilms__search">
        <div className="findFilms__search-container">
          <input
            className="findFilms__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <input
            className="findFilms__button"
            type="image"
            src={PicSearch}
            alt="Иконка поиска"
          />
        </div>
        <div className="findFilms__checkbox-container">
          <label className="findFilms__checkbox-label">
            <input
              className="findFilms__checkbox"
              type="checkbox"
              id="checkbox"
            />
            <span className="findFilms__checkbox-span" />
            <span className="findFilms__checkbox-text">Короткометражки</span>
          </label>
        </div>
        
      </form>
    </section>
  );
}
