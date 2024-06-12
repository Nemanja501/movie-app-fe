import { useEffect, useState } from "react"
import DirectorService from "../services/director-service";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function Director() {
  const {id} = useParams();
  const [director, setDirector] = useState({});
  const [movies, setMovies] = useState([]);

  async function fetchDirector(){
    try{
        const data = await DirectorService.getDirector(id);
        setDirector(data.data.director);
        setMovies(data.data.director.movies);
    }catch(err){
        console.log(err);
    }
  }

  useEffect(() =>{
    fetchDirector();
  }, [])

  return (
    <div>
        <h1 className="page-title">{director.name}</h1>
        <img className="image" src={`http://localhost:8080/${director.imageUrl}`}></img>
        <h2 className="subtitle">Age: {director.age}</h2>
        <h2 className="subtitle">Bio: </h2>
        <p className="description">{director.bio}</p>
        <h2 className="subtitle">Movies: </h2>
        {movies.length > 0 ? <><div className="movie-list">
          {movies.map((movie, index) =>{
          return <MovieCard key={index} movieData={movie} />
        })}
        </div></> : <p>No movies found</p>}
    </div>
  )
}
