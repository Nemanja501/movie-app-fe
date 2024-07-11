import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import { useContext } from "react";
import { AdminContext, TokenContext } from "./util/contexts";
import NotFound from "./pages/NotFound";
import AddMovie from "./pages/admin/AddMovie";
import SingleMovie from "./pages/SingleMovie";
import AddDirector from "./pages/admin/AddDirector";
import SingleDirector from "./pages/SingleDirector";
import AddActor from "./pages/admin/AddActor";
import SingleActor from "./pages/SingleActor";
import Watchlist from "./pages/Watchlist";
import WatchedMovies from "./pages/WatchedMovies";
import Actors from "./pages/Actors";
import Directors from "./pages/Directors";

export default function Router() {
  const {token} = useContext(TokenContext);
  const {isAdmin} = useContext(AdminContext);

  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/actors/" element={<Actors/>} />
              <Route path="/directors/" element={<Directors/>} />
              <Route path="/movies/:id" element={<SingleMovie/>} />
              <Route path="/directors/:id" element={<SingleDirector/>} />
              <Route path="/actors/:id" element={<SingleActor/>} />
              {isAdmin && <>
                <Route path="/add-movie" element={<AddMovie/>} />
                <Route path="/add-director" element={<AddDirector/>} />
                <Route path="/add-actor" element={<AddActor/>} />
              </>}
              {!token && <>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
              </>}
              {token && <>
                <Route path="/watchlist" element={<Watchlist/>} />
                <Route path="/watched-movies" element={<WatchedMovies/>} />
              </>}
              <Route path="*" element={<NotFound/>} />
          </Routes>
      </BrowserRouter>
  )
}
