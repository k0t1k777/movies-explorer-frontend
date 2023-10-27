import "./SavedFilms.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import ListFilms from "../Movies/ListFilms/ListFilms";

export default function SavedFilms({ savedMovies, onDeleteMovie }) {
  // Длительность фильма
  const timemDuration = 40;
  const loggedIn = localStorage.getItem("isLoggedIn");
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [savedSearch, setSavedSearch] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);

  const filter = useCallback((search, isCheck, movies) => {
    const filterMovies = movies.filter((movie) => {
      const searchName =
        movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return isCheck
        ? searchName && movie.duration <= timemDuration
        : searchName;
    });
    setFilteredMovies(filterMovies);
  }, []);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true);
    } else {
      setFirstEntrance(false);
    }
    filter(savedSearch, isCheck, savedMovies);
  }, [filter, savedMovies, isCheck, savedSearch]);

  function getFilms(search) {
    setFirstEntrance(false);
    filter(search, isCheck, savedMovies);
    setSavedSearch(search);
  }

  return (
    <>
      <Header loggedIn={loggedIn} name="movies" />
      <main>
        <SearchForm
          firstEntrance={firstEntrance}
          isCheck={isCheck}
          getFilms={getFilms}
          savedSearch={savedSearch}
          filter={filter}
          setIsCheck={setIsCheck}
          moviesData={savedMovies}
        />
        <ListFilms
          name="saved-movies"
          cards={filteredMovies}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}
