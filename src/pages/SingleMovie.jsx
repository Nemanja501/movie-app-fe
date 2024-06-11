import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import MovieService from "../services/movie-service";

export default function SingleMovie() {
  const {id} = useParams();
  const [movie, setMovie] = useState({});

  async function fetchSingleMovie(){
    try{
        const data = await MovieService.getSingleMovie(id);
        setMovie(data.data.movie);
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
        <h2 className="year">Year of release: {movie.year}</h2>
        <img className="poster" src={`http://localhost:8080/${movie.posterUrl}`}></img>
        <p className="description">Description: {movie.description}</p>
    </div>
  )
}
