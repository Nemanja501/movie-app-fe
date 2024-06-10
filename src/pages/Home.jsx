import { useEffect, useState } from "react"
import MovieService from "../services/movie-service";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);

  async function fetchMovies(){
    try{
      const data = await MovieService.getMovies();
      setMovies(data.data.movies);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchMovies();
  }, [])


  return (
    <div>
        <h1 className="page-title">Home</h1>
        {movies.length > 0 ? movies.map((movie, index) =>{
          return <MovieCard key={index} movieData={movie} />
        }) : <p>No movies found</p>}
    </div>
  )
}
