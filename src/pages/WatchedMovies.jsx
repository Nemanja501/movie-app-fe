import { useContext, useEffect, useState } from "react";
import MovieService from "../services/movie-service";
import { TokenContext, UserContext } from "../util/contexts";
import WatchedMovieCard from "../components/WatchedMovieCard";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

export default function WatchedMovies() {
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);


  async function fetchWatchedMovies(){
    try{
        const data = await MovieService.getWatchedMovies(userId, token, page);
        setMovies(data.data.userMovies.watched);
        setTotalItems(data.data.totalItems);
        
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    fetchWatchedMovies();
    setSearchParams({page: page});
  }, [page])

  return (
    <div className="watched-movie-page">
      <h1 className="page-title">Watched Movies</h1>
      <div className="watched-movie-container">
        {movies.length > 0 ? movies.map(movie => <WatchedMovieCard key={movie._id} movieData={movie} />)
          : <h2 className="subtitle">No watched movies</h2>}
      </div>
      {movies.length > 0 && <Pagination id={'pagination-watched-movies'} setPage={setPage} totalItems={totalItems} itemsPerPage={15} />}
    </div>
  )
}
