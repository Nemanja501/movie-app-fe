import { useContext, useEffect } from "react"
import MovieService from "../services/movie-service";
import { TokenContext, UserContext } from "../util/contexts";

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

  useEffect(()=>{
    const stars = document.querySelectorAll('i');
    if(movieData.rating){
      for(let i = 0; i < movieData.rating; i++){
        stars[i].classList.add('active-star');
      }
    }
    stars.forEach((star1, index1) =>{
      star1.addEventListener('click', () =>{
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
        <h2>{movieData.movie.title} {`(${movieData.movie.year})`}</h2>
        <div className="rating-div">
            <h2>Your rating: </h2>
            <div className="ratings">
              <i className="fa fa-solid fa-star"></i>
              <i className="fa fa-solid fa-star"></i>
              <i className="fa fa-solid fa-star"></i>
              <i className="fa fa-solid fa-star"></i>
              <i className="fa fa-solid fa-star"></i>
            </div>
        </div>
    </div>
  )
}
