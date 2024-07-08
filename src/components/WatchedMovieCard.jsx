import { useContext, useEffect } from "react"
import MovieService from "../services/movie-service";
import { TokenContext, UserContext } from "../util/contexts";
import { Link } from "react-router-dom";

export default function WatchedMovieCard({movieData}) {
  const {userId} = useContext(UserContext);
  const {token} = useContext(TokenContext);

  async function addRating(rating){
    try{
      await MovieService.addRating(rating, userId, movieData.movie._id, token);
    }catch(err){
      console.log(err);
    }
  }

  async function removeFromWatchedMovies(){
    if(window.confirm('Do you want to remove this movie from watched movies?')){
      try{
        await MovieService.removeFromWatched(userId, movieData.movie._id, token);
        window.location.reload();
      }catch(err){
        console.log(err);
      }
    }
  }

  useEffect(()=>{
    const stars = document.querySelectorAll(`#stars-${movieData.movie._id} > i`);
    if(movieData.rating){
      for(let i = 0; i < movieData.rating; i++){
        stars[i].classList.add('active-star');
      }
    }
    stars.forEach((star1, index1) =>{
      star1.addEventListener('click', function (e){
        e.stopImmediatePropagation();
        e.preventDefault();
        console.log(e);
        addRating(index1 + 1);
        stars.forEach((star2, index2) =>{
          if(index2 <= index1){
            star2.classList.add('active-star');
          }else{
            star2.classList.remove('active-star');
          }
        })
      })
    });
  }, [])

  return (
    <div className="watched-movie-card">
        <h2><Link to={`/movies/${movieData.movie._id}`}>{movieData.movie.title} {`(${movieData.movie.year})`}</Link></h2>
        <div id="review-div" className="rating-div">
            <h2>Your rating: </h2>
            <div id={`stars-${movieData.movie._id}`} className="ratings">
              <i className="fa fa-solid fa-star clickable-star"></i>
              <i className="fa fa-solid fa-star clickable-star"></i>
              <i className="fa fa-solid fa-star clickable-star"></i>
              <i className="fa fa-solid fa-star clickable-star"></i>
              <i className="fa fa-solid fa-star clickable-star"></i>
            </div>
            <button onClick={removeFromWatchedMovies} id="remove-from-watched-btn" className="delete-btn">X</button>
        </div>
    </div>
  )
}
