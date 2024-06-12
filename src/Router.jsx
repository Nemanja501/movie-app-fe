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
import Director from "./pages/Director";

export default function Router() {
  const {token} = useContext(TokenContext);
  const {isAdmin} = useContext(AdminContext);

  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/movies/:id" element={<SingleMovie/>} />
              <Route path="/directors/:id" element={<Director/>} />
              {isAdmin && <>
                <Route path="/add-movie" element={<AddMovie/>} />
                <Route path="/add-director" element={<AddDirector/>} />
              </>}
              {!token && <>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
              </>}
              <Route path="*" element={<NotFound/>} />
          </Routes>
      </BrowserRouter>
  )
}
