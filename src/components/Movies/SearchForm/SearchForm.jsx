import { useState, useEffect } from "react";
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
  const [searchInputValue, setSearchInputValue] = useState("");
  const { values, handleChange, reset } = useValidation();

  // Загрузка из localStorage при первой загрузке
  useEffect(() => {
    const savedSearch = localStorage.getItem("searchInputValue");
    if (savedSearch && name === "movies") {
      // setSearchInputValue(savedSearch);
      reset({ searchInput: savedSearch });
    } else {
      reset({ searchInput: "" });
    }
  }, [reset, name]);

  function turnCheckbox() {
    setIsCheck(!isCheck);
    filter(values.searchInput, !isCheck, moviesData);
    if (name === "movies") {
      localStorage.setItem("searchInputValue", values.searchInput || "");
    }
  }

  function onSubmit(evt) {
    evt.preventDefault();
    getFilms(searchInputValue);
    if (searchInputValue && name === "movies") {
      localStorage.setItem("searchInputValue", searchInputValue);
    }
  }

  return (
    <section className="findFilms">
      <form className="findFilms__search" noValidate onSubmit={onSubmit}>
        <div className="findFilms__search-container">
          <input
            name="searchInput"
            id="searchInput"
            className="findFilms__input"
            type="text"
            placeholder="Фильм"
            value={searchInputValue || ""}
            required={true}
            onChange={(evt) => {
              setSearchInputValue(evt.target.value);
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
              name="checkbox"
              id="checkbox"
              className="findFilms__checkbox"
              type="checkbox"
              checked={isCheck}
              onChange={turnCheckbox}
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
