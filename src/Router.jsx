import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import { useContext } from "react";
import { AdminContext, TokenContext } from "./util/contexts";
import NotFound from "./pages/NotFound";
import AddMovie from "./pages/admin/AddMovie";

export default function Router() {
  const {token} = useContext(TokenContext);
  const {isAdmin} = useContext(AdminContext);

  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>
              <Route path="/" element={<Home/>} />
              {isAdmin && <>
                <Route path="/add-movie" element={<AddMovie/>} />
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