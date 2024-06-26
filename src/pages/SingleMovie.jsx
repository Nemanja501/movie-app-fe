import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import MovieService from "../services/movie-service";
import { AdminContext, TokenContext, UserContext } from "../util/contexts";
import Errors from "../components/Errors";

export default function SingleMovie() {
  const {id} = useParams();
  const [movie, setMovie] = useState({});
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const {isAdmin} = useContext(AdminContext);
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState([]);
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });
  const navigate = useNavigate();

  async function fetchSingleMovie(){
    try{
        const data = await MovieService.getSingleMovie(id);
        setMovie(data.data.movie);
        setDirector(data.data.movie.director);
        setActors(data.data.movie.cast);
    }catch(err){
        console.log(err);
    }
  }

  async function deleteMovie(){
    if(window.confirm('Do you really want to delete this movie?')){
      try{
        const data = await MovieService.deleteMovie(id, token, userId);
        console.log(data);
        navigate('/');
      }catch(err){
        console.log(err);
      }
    }
  }

  async function addToWatchlist(){
    try{
      await MovieService.addToWatchlist(id, userId, token);
      navigate('/watchlist');
    }catch(err){
      if(err.response.data){
        const message = err.response.data.message;
        const data = err.response.data.data;
        setErrors({message, data});
      }
    }
  }

  useEffect(()=>{
    fetchSingleMovie();
  }, [])

  return (
    <div>
        <h1 className="page-title">{movie.title}</h1>
        <img className="poster" src={`http://localhost:8080/${movie.posterUrl}`}></img>
        {isAdmin && <button className="delete-btn" onClick={deleteMovie}>Delete Movie</button>}
        {isAdmin && <button className="edit-btn"><Link to={`/add-movie?id=${movie._id}&editing=true`} style={{ textDecoration: 'none' }}>Edit Movie</Link></button>}
        {token && <button className="edit-btn" onClick={addToWatchlist}>Add to Watchlist</button>}
        {errors.message && <Errors message={errors.message} data={errors.data} />}
        <h2 className="subtitle">Directed by: <Link to={`/directors/${director._id}`}>{director && director.name}</Link></h2>
        {actors.length > 0 && <h2 className="subtitle">Cast: {actors.map((actor, index) =>{
          if(!(index + 1 == actors.length)){
            return <Link key={index} to={`/actors/${actor._id}`}>{actor.name + ', '}</Link>
          }else{
            return <Link key={index} to={`/actors/${actor._id}`}>{actor.name}</Link>
          }
        })}</h2>}
        <h2 className="subtitle">Year of release: {movie.year}</h2>
        <h2 className="subtitle">Description: </h2>
        <p className="description">{movie.description}</p>
    </div>
  )
}
