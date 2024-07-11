import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import MovieService from "../services/movie-service";
import { AdminContext, TokenContext, UserContext } from "../util/contexts";
import Errors from "../components/Errors";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import Pagination from "../components/Pagination";

export default function SingleMovie() {
  const {id} = useParams();
  const [movie, setMovie] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const {isAdmin} = useContext(AdminContext);
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });
  const navigate = useNavigate();

  async function fetchSingleMovie(){
    try{
        const data = await MovieService.getSingleMovie(id, page);
        setMovie(data.data.movie);
        setDirector(data.data.movie.director);
        setActors(data.data.movie.cast);
        setReviews(data.data.movie.reviews);
        setTotalItems(data.data.totalItems);
    }catch(err){
        console.log(err);
    }
  }

  async function deleteMovie(){
    if(window.confirm('Do you really want to delete this movie?')){
      try{
        const data = await MovieService.deleteMovie(id, token, userId);
        console.log(data);
        navigate('/');
      }catch(err){
        console.log(err);
      }
    }
  }

  async function addToWatchlist(){
    try{
      await MovieService.addToWatchlist(id, userId, token);
      navigate('/watchlist');
    }catch(err){
      if(err.response.data){
        const message = err.response.data.message;
        const data = err.response.data.data;
        setErrors({message, data});
      }
    }
  }

  async function markMovieAsWatched(){
    try{
      await MovieService.markAsWatched(userId, id, token);
      navigate('/watched-movies');
    }catch(err){
      if(err.response.data){
        const message = err.response.data.message;
        const data = err.response.data.data;
        setErrors({message, data});
      }
    }
  }

  useEffect(()=>{
    fetchSingleMovie();
    setSearchParams({page: page});
  }, [page])

  return (
    <div>
        <h1 className="page-title">{movie.title}</h1>
        <img className="poster" src={`http://localhost:8080/${movie.posterUrl}`}></img>
        {isAdmin && <button className="delete-btn" onClick={deleteMovie}>Delete Movie</button>}
        {isAdmin && <button className="edit-btn"><Link to={`/add-movie?id=${movie._id}&editing=true`} style={{ textDecoration: 'none' }}>Edit Movie</Link></button>}
        {!isAdmin && <br/>}
        {token && <button className="watchlist-btn" onClick={addToWatchlist}>Add to Watchlist</button>}
        {token && <button className="watchlist-btn" onClick={markMovieAsWatched}>Mark As Watched</button>}
        {errors.message && <Errors message={errors.message} data={errors.data} />}
        {movie.averageRating && <h2 className="subtitle">Average rating: {movie.averageRating}/5</h2>}
        <h2 className="subtitle">Directed by: <Link to={`/directors/${director._id}`}>{director && director.name}</Link></h2>
        {actors.length > 0 && <h2 className="subtitle">Cast: {actors.map((actor, index) =>{
          if(!(index + 1 == actors.length)){
            return <Link key={index} to={`/actors/${actor._id}`}>{actor.name + ', '}</Link>
          }else{
            return <Link key={index} to={`/actors/${actor._id}`}>{actor.name}</Link>
          }
        })}</h2>}
        <h2 className="subtitle">Year of release: {movie.year}</h2>
        <h2 className="subtitle">Description: </h2>
        <p className="description">{movie.description}</p>
        {token && <button className="edit-btn" onClick={() => setShowPopup(true)}>Add a Review</button>}
        {showPopup && <AddReview setShowPopup={setShowPopup} movieId={id}/>}
        <Reviews reviews={reviews} />
        {reviews.length > 0 && <Pagination setPage={setPage} totalItems={totalItems} itemsPerPage={8} />}
    </div>
  )
}
