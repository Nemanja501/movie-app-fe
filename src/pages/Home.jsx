import { useEffect, useState } from "react"
import MovieService from "../services/movie-service";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);

  async function fetchMovies(){
    try{
      const data = await MovieService.getMovies(page);
      setMovies(data.data.movies);
      setTotalItems(data.data.totalItems);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchMovies();
    setSearchParams({page: page});
  }, [page]);


  return (
    <div>
        <h1 className="page-title">Home</h1>
        {movies.length > 0 ? <><div className="movie-list">
          {movies.map((movie, index) =>{
          return <MovieCard key={index} movieData={movie} />
        })}
        </div><Pagination totalItems={totalItems} setPage={setPage}/></> : <h2 className="subtitle">No movies found</h2>}
    </div>
  )
}
