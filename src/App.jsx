import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import MovieDetails from "./pages/MovieDetails";
import "./App.css"
import SearchBarMovies from "./component/SearchBarMovies";
import SearchBarSeries from "./component/SearchBarSeries";
import PersonDetails from "./pages/PersonDetails";
import TVDetails from "./pages/TVDetails";
import SearchBarPerson from "./component/SearchBarPerson";
import NavLayout from "./layout/NavLayout";
import ListOfContent from "./component/ListOfContent";
import MainContaner from "./pages/MainContaner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout />} >

          <Route path="/" element={<MainContaner />} >
            <Route index element={<Home />}></Route>
            <Route path="movie" element={<SearchBarMovies />} />
            <Route path="series" element={<SearchBarSeries />} />
            <Route path="person" element={<SearchBarPerson />} />
          </Route>
          <Route path="/list/:name" element={<ListOfContent />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/series/:id" element={<TVDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} >
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
