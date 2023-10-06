import { Route, Routes } from "react-router-dom";
import "./App.jsx";
import Main from "../Main/Main.jsx";
import "./App.css";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import Error404 from "../Error404/Error404.jsx";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedFilms from "../SavedFilms/SavedFilms.jsx";

function App() {

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main A={''} B={''}/>}/>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedFilms />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
