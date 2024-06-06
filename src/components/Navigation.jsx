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
            <section className="left-container">
            <ul>
                <li>
                    <Link to={"/"} className="nav-link">Home</Link>
                </li>
                {isAdmin && <>
                    <li>
                        <Link to={"/add-movie"} className="nav-link">Add Movie</Link>
                    </li>
                </>}
            </ul>
            </section>
            <section className="right-container">
                <ul>
                    {!token ? <>
                        <li>
                            <Link to={"/login"} className="nav-link">Log In</Link>
                        </li>
                        <li>
                            <Link to={"/signup"} className="nav-link">Sign Up</Link>
                        </li>
                    </> : <>
                        <li className="nav-link-logout">
                            <a href="#" onClick={logout} className="nav-link">Log Out</a>
                        </li>
                    </>}
                </ul>
            </section>
        </nav>
    </div>
  )
}
