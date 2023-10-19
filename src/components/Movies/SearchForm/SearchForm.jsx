import "./SearchForm.css";
import { useState } from "react";
import PicSearch from "../../../images/find.svg";

// handleSearch ()
// получишь список найденных фильмов - и сравншиь с likesMovies
// вернешь список найденных и сохранишь

export default function SearchForm({
  // firstEntrance,
  isCheck,
  getingFilms,
  savedSearch,
  filter,
  setIsCheck,
  // moviesData
}) {

  const [search, setSearch] = useState(savedSearch);

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getingFilms(search);
  }

  function handleCheckboxChange() {
    setIsCheck(!isCheck);
    filter(search, !isCheck);
    console.log(search, !isCheck)
  }

  return (
    <section className="findFilms">
      <form className="findFilms__search" noValidate onSubmit={handleSubmit}>
        <div className="findFilms__search-container">
          <input
            className="findFilms__input"
            type="text"
            placeholder="Фильм"
            onChange={handleSearchChange}
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
              onChange={handleCheckboxChange}
              checked={isCheck}
              // disabled={firstEntrance}
            />
            <span className="findFilms__checkbox-span" />
            <span className="findFilms__checkbox-text">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  );
}
