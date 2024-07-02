import { useContext, useEffect, useState } from "react"
import MovieService from "../services/movie-service";
import {TokenContext, UserContext} from "../util/contexts";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function Watchlist() {
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);

  async function fetchWatchlist(){
    try{
      const data = await MovieService.getWatchlist(userId, token);
      setMovies(data.data.user.watchlist);
      setTotalItems(data.data.totalItems);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchWatchlist();
    setSearchParams({page: page});
  }, [page]);

  return (
    <div>
        <h1 className="page-title">Watchlist</h1>
        {movies.length > 0 ? <><div className="movie-list">
          {movies.map((movie, index) =>{
          return <MovieCard key={index} movieData={movie} isInWatchlist={true} />
        })}
        </div>{<Pagination totalItems={totalItems} setPage={setPage}/>}</> : <h2 className="subtitle">No movies in watchlist</h2>}
    </div>
  )
}
