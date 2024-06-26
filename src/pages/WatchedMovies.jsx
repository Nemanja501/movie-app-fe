import { useContext, useEffect, useState } from "react";
import MovieService from "../services/movie-service";
import { TokenContext, UserContext } from "../util/contexts";
import WatchedMovieCard from "../components/WatchedMovieCard";

export default function WatchedMovies() {
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const [movies, setMovies] = useState([]);


  async function fetchWatchedMovies(){
    try{
        const data = await MovieService.getWatchedMovies(userId, token);
        setMovies(data.data.movies);
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    fetchWatchedMovies();
  }, [])

  return (
    <div>
        <h1 className="page-title">Watched Movies</h1>
        {movies.length > 0 && movies.map(movie => <WatchedMovieCard key={movie._id} movieData={movie} />)}
    </div>
  )
}
