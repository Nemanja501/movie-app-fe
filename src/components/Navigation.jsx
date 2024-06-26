import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext, TokenContext, UserContext } from "../util/contexts";

export default function Navigation() {
  const {token, setToken} = useContext(TokenContext);
  const {setUserId} = useContext(UserContext);
  const {isAdmin, setIsAdmin} = useContext(AdminContext);
  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken('');
    setUserId('');
    setIsAdmin(false);
    navigate('/');
  }

  return (
    <div>
        <nav className="navbar">
            <section className={isAdmin ? 'left-container-admin' : 'left-container'}>
            <ul>
                <li>
                    <Link to={"/"} className="nav-link">Home</Link>
                </li>
                {isAdmin && <>
                    <li>
                        <Link to={"/add-movie"} className="nav-link">Add Movie</Link>
                    </li>
                    <li>
                        <Link to={"/add-director"} className="nav-link">Add Director</Link>
                    </li>
                    <li>
                        <Link to={"/add-actor"} className="nav-link">Add Actor</Link>
                    </li>
                </>}
                {token && <>
                    <li>
                        <Link to={"/watchlist"} className="nav-link">Watchlist</Link>
                    </li>
                    <li>
                        <Link to={"/watched-movies"} className="nav-link">Watched Movies</Link>
                    </li>
                </>}
            </ul>
            </section>
            <section className="right-container">
                <ul>
                    {!token ? <>
                        <li>
                            <Link to={"/login"} className="nav-link-right">Log In</Link>
                        </li>
                        <li>
                            <Link to={"/signup"} className="nav-link-right">Sign Up</Link>
                        </li>
                    </> : <>
                        <li className="nav-link-logout">
                            <a href="#" onClick={logout} className="nav-link-right">Log Out</a>
                        </li>
                    </>}
                </ul>
            </section>
        </nav>
    </div>
  )
}
