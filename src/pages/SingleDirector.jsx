import { useContext, useEffect, useState } from "react"
import DirectorService from "../services/director-service";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { AdminContext, TokenContext, UserContext } from "../util/contexts";

export default function SingleDirector() {
  const {id} = useParams();
  const [director, setDirector] = useState({});
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const {isAdmin} = useContext(AdminContext);
  const navigate = useNavigate();

  async function fetchDirector(){
    try{
        const data = await DirectorService.getDirector(id, page);
        setDirector(data.data.director);
        setMovies(data.data.director.movies);
        setTotalItems(data.data.totalItems);
    }catch(err){
        console.log(err);
    }
  }

  async function deleteDirector(){
    if(window.confirm('Do you really want to delete this director? All of their movies will be deleted')){
      try{
        const data = await DirectorService.deleteDirector(id, token, userId);
        console.log(data);
        navigate('/');
      }catch(err){
        console.log(err);
      }
    }
  }

  useEffect(() =>{
    fetchDirector();
    setSearchParams({page: page});
  }, [page])

  return (
    <div>
        <h1 className="page-title">{director.name}</h1>
        <img className="image" src={`http://localhost:8080/${director.imageUrl}`}></img>
        {isAdmin && <button className="delete-btn" onClick={deleteDirector}>Delete Director</button>}
        {isAdmin && <button className="edit-btn"><Link to={`/add-director?id=${director._id}&editing=true`} style={{ textDecoration: 'none' }}>Edit Director</Link></button>}
        <h2 className="subtitle">Age: {director.age}</h2>
        <h2 className="subtitle">Bio: </h2>
        <p className="description">{director.bio}</p>
        <h2 className="subtitle">Movies: </h2>
        {movies.length > 0 ? <><div className="movie-list">
          {movies.map((movie, index) =>{
          return <MovieCard key={index} movieData={movie} />
        })}
        </div>{<Pagination totalItems={totalItems} setPage={setPage}/>}</> : <h2 className="subtitle">No movies found</h2>}
    </div>
  )
}
