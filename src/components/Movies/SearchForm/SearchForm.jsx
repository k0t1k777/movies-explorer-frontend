import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import useValidation from "../../../components/hooks/useValidation";

export default function SearchForm({
  name,
  firstEntrance,
  isCheck,
  getingFilms,
  filter,
  setIsCheck,
  moviesData,
  // savedMovie
}) {
  const { values, handleChange, reset } = useValidation();

// Загрузка значения из localStorage при первой загрузке компонента
useEffect(() => {
  const savedSearch = localStorage.getItem("searchInputValue");
  if (savedSearch && name === "movies") {
    reset({ searchInput: savedSearch });
  } else {
    reset({ searchInput: "" });
  }
}, [reset, name]);

function changeShort() {
  if (isCheck) {
    setIsCheck(false);
    filter(values.searchInput, false, moviesData);
  } else {
    setIsCheck(true);
    filter(values.searchInput, true, moviesData);
  }
  // Сохраняем значение поиска в localStorage при изменении чекбокса
  if (name === "movies") {
    localStorage.setItem("searchInputValue", values.searchInput || "");
  }
}

function onSubmit(evt) {
  evt.preventDefault();
  const searchInputValue = evt.target.searchInput.value;
  getingFilms(evt.target.searchInput.value);
  if (searchInputValue && name === "movies") {
    // Сохраняем значение поиска в localStorage
    localStorage.setItem("searchInputValue", searchInputValue);
  }
}
  return (
    <section className="findFilms">
      <form className="findFilms__search" noValidate onSubmit={onSubmit}>
        <div className="findFilms__search-container">
          <input
            className="findFilms__input"
            type="text"
            placeholder="Фильм"
            name="searchInput"
            id="searchInput"
            value={values.searchInput || ""}
            required
            onChange={(evt) => {
              handleChange(evt);
            }}
            // disabled={savedMovie ? (savedMovie.length === 0 && true) : false}
          />
          <button
            className="findFilms__button"
            type="submit"
            alt="Иконка поиска"
          />
        </div>
        <div className="findFilms__checkbox-container">
          <label className="findFilms__checkbox-label">
            <input
              className="findFilms__checkbox"
              name="checkbox"
              type="checkbox"
              id="checkbox"
              checked={isCheck}
              onChange={() => changeShort()}
              disabled={firstEntrance}
            />
            <span className="findFilms__checkbox-span" />
            <span className="findFilms__checkbox-text">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  );
}
