import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  const router = createBrowserRouter([
    {
      Component: NavLayout, children: [
        {
          path: "/",
          Component: MainContaner,
          children: [
            { index: true, Component: Home },
            { path: "movie", Component: SearchBarMovies },
            { path: "series", Component: SearchBarSeries },
            { path: "person", Component: SearchBarPerson },
          ],
        },
        { path: "/list/:name", Component: ListOfContent },
        { path: "/movie/:id", Component: MovieDetails },
        { path: "/series/:id", Component: TVDetails },
        { path: "/person/:id", Component: PersonDetails },
      ],
    },
  ]);
  return (

    <RouterProvider router={router} />
  );
}
