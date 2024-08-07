import { Link, useNavigate } from "react-router-dom";
import MovieService from "../services/movie-service";
import { useContext } from "react";
import { TokenContext, UserContext } from "../util/contexts";

export default function MovieCard({movieData, isInWatchlist}) {
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const navigate = useNavigate();

  async function markAsWatched(){
    try{
      await MovieService.markAsWatched(userId, movieData._id, token);
      navigate('/watched-movies');
    }catch(err){
      console.log(err);
    }
  }

  async function removeFromWatchlist(){
    if(window.confirm('Do you want to remove this movie from your watchlist?')){
      try{
        await MovieService.removeFromWatchlist(userId, movieData._id, token);
        window.location.reload();
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div className={isInWatchlist ? 'movie-card watchlist' : 'movie-card'}>
        <h3>{movieData.title}</h3>
        <h4>{movieData.year}</h4>
        <img src={`http://localhost:8080/${movieData.posterUrl}`}></img>
        <Link to={`/movies/${movieData._id}`} className="view-movie-btn">View Movie</Link>
        {isInWatchlist && <button onClick={markAsWatched} className="mark-as-watched-btn">Mark As Watched</button>}
        {isInWatchlist && <button onClick={removeFromWatchlist} className="delete-btn">X</button>}
    </div>
  )
}
