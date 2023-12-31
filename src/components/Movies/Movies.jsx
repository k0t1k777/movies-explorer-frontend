import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilmsCard from "./FilmsCard/FilmsCard";
import OtherFilms from "./OtherFilms/OtherFilms";
import Footer from "../Footer/Footer";

// вся обработка тут
// тут назначаешь query, isShort, handleSearchб foundMoives

export default function Movies({ handleMovieLike }) {
  const loggedIn = localStorage.getItem("isLoggedIn");
  console.log("Movies прочитал состояние", loggedIn);
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <SearchForm />
        <FilmsCard />
        <OtherFilms />
      </section>
      <Footer />
    </>
  );
}
