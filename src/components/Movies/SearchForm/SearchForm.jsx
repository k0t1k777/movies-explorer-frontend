import { useEffect } from "react";
import "./SearchForm.css";
import useValidation from "../../../components/hooks/useValidation";

export default function SearchForm({
  name,
  firstEntrance,
  isCheck,
  getFilms,
  filter,
  setIsCheck,
  moviesData,
}) {
  const { values, handleChange, reset } = useValidation();

// Загрузка из localStorage при первой загрузке
useEffect(() => {
  const savedSearch = localStorage.getItem("searchInputValue");
  if (savedSearch && name === "movies") {
    reset({ searchInput: savedSearch });
  } else {
    reset({ searchInput: "" });
  }
}, [reset, name]);

function turnCheckbox() {
  if (isCheck) {
    setIsCheck(false);
    filter(values.searchInput, false, moviesData);
  } else {
    setIsCheck(true);
    filter(values.searchInput, true, moviesData);
  }
  if (name === "movies") {
    localStorage.setItem("searchInputValue", values.searchInput || "");
  }
}

function onSubmit(evt) {
  evt.preventDefault();
  const searchInputValue = evt.target.searchInput.value;
  getFilms(evt.target.searchInput.value);
  if (searchInputValue && name === "movies") {
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
            required={true}
            onChange={(evt) => {
              handleChange(evt);
            }}
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
              onChange={() => turnCheckbox()}
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
