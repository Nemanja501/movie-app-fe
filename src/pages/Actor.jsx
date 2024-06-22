import { useContext, useEffect, useState } from "react"
import ActorService from "../services/actor-service";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { AdminContext, TokenContext, UserContext } from "../util/contexts";

export default function Actor() {
  const {id} = useParams();
  const [actor, setActor] = useState({});
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const {isAdmin} = useContext(AdminContext);
  const navigate = useNavigate();

  async function fetchActor(){
    try{
        const data = await ActorService.getActor(id, page);
        setActor(data.data.actor);
        setMovies(data.data.actor.movies);
        setTotalItems(data.data.totalItems);
    }catch(err){
        console.log(err);
    }
  }

  async function deleteActor(){
    if(window.confirm('Do you really want to delete this actor?')){
      try{
        const data = await ActorService.deleteActor(id, token, userId);
        console.log(data);
        navigate('/');
      }catch(err){
        console.log(err);
      }
    }
  }

  useEffect(() =>{
    fetchActor();
    setSearchParams({page: page});
  }, [page])

  return (
    <div>
        <h1 className="page-title">{actor.name}</h1>
        <img className="image" src={`http://localhost:8080/${actor.imageUrl}`}></img>
        {isAdmin && <button className="delete-btn" onClick={deleteActor}>Delete Actor</button>}
        {isAdmin && <button className="edit-btn"><Link to={`/add-actor?id=${actor._id}&editing=true`} style={{ textDecoration: 'none' }}>Edit Actor</Link></button>}
        <h2 className="subtitle">Age: {actor.age}</h2>
        <h2 className="subtitle">Bio: </h2>
        <p className="description">{actor.bio}</p>
        <h2 className="subtitle">Movies: </h2>
        {movies.length > 0 ? <><div className="movie-list">
          {movies.map((movie, index) =>{
          return <MovieCard key={index} movieData={movie} />
        })}
        </div>{<Pagination totalItems={totalItems} setPage={setPage}/>}</> : <h2 className="subtitle">No movies found</h2>}
    </div>
  )
}
