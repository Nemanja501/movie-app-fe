import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import MovieService from "../services/movie-service";
import { AdminContext, TokenContext, UserContext } from "../util/contexts";

export default function SingleMovie() {
  const {id} = useParams();
  const [movie, setMovie] = useState({});
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const {isAdmin} = useContext(AdminContext);
  const [director, setDirector] = useState('');
  const navigate = useNavigate();

  async function fetchSingleMovie(){
    try{
        const data = await MovieService.getSingleMovie(id);
        setMovie(data.data.movie);
        setDirector(data.data.movie.director);
    }catch(err){
        console.log(err);
    }
  }

  async function deleteMovie(){
    try{
      const data = await MovieService.deleteMovie(id, token, userId);
      console.log(data);
      navigate('/');
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchSingleMovie();
  }, [])

  return (
    <div>
        <h1 className="page-title">{movie.title}</h1>
        <hr></hr>
        {isAdmin && <button className="delete-btn" onClick={deleteMovie}>Delete Movie</button>}
        <h2 className="subtitle">Directed by: <Link to={`/directors/${director._id}`}>{director && director.name}</Link></h2>
        <h2 className="subtitle">Year of release: {movie.year}</h2>
        <img className="poster" src={`http://localhost:8080/${movie.posterUrl}`}></img>
        <p className="description">Description: {movie.description}</p>
    </div>
  )
}
