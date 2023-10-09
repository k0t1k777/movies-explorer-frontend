import "./Movies.css"
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import ListOfFilms from "./ListOfFilms/ListOfFilms";
import OtherFilms from "./OtherFilms/OtherFilms";
import Footer from "../Footer/Footer";

export default function Main() {
  return (
    <>
    <Header />
    <section className="movies">
      <SearchForm />
      <ListOfFilms />
      <OtherFilms />
    </section>
    <Footer />
    </>
  );
}