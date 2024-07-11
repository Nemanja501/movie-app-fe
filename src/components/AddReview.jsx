import { useContext, useEffect, useState } from "react"
import MovieService from "../services/movie-service";
import { TokenContext, UserContext } from "../util/contexts";
import Errors from "./Errors";

export default function AddReview({setShowPopup, movieId}) {
  const {token} = useContext(TokenContext);
  const {userId} = useContext(UserContext);
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState({
    title: '',
    content: '',
    rating: rating,
    userId,
    movieId
  });
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });


  async function getRating(){
    try{
      const data = await MovieService.getRating(userId, movieId, token);
      const ratingData = data.data.rating;
      const stars = document.querySelectorAll(`#add-review-stars-${movieId} > i`);
      if(ratingData > 0){
        setRating(ratingData);
        for(let i = 0; i < ratingData; i++){
          stars[i].classList.add('active-star');
        }
      }
      stars.forEach((star1, index1) => {
        star1.addEventListener('click', () =>{
          setRating(index1 + 1);
          stars.forEach((star2, index2) =>{
            if(index2 <= index1){
              star2.classList.add('active-star');
            }else{
              star2.classList.remove('active-star');
            }
          });
        });
      });

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() =>{
    getRating();
  }, []);


  async function handleSubmit(){
    try{
      await MovieService.addReview({...review, rating: rating}, token);
      window.location.reload();
    }catch(err){
      console.log(err.response.data);
      if(err.response.data){
        const message = err.response.data.message;
        const data = err.response.data.data;
        console.log('data', data);
        setErrors({message, data});
      }
    }
  }

  return (
    <div className="popup">
        <div className="popup-inner">
            <h1>Add a Review</h1>
            <button id="close-btn" className="delete-btn" onClick={() => setShowPopup(false)}>Close</button>
            <div id="add-review-div" className="rating-div">
                <h2>Your rating: </h2>
                <div id={`add-review-stars-${movieId}`} className="ratings">
                  <i className="fa fa-solid fa-star clickable-star"></i>
                  <i className="fa fa-solid fa-star clickable-star"></i>
                  <i className="fa fa-solid fa-star clickable-star"></i>
                  <i className="fa fa-solid fa-star clickable-star"></i>
                  <i className="fa fa-solid fa-star clickable-star"></i>
                </div>
            </div>
            <label id="review-label" className="form-label">Title</label>
            <input id="review-input" className="form-input" onChange={e => setReview({...review, title: e.target.value})}></input>
            <label id="review-label" className="form-label">Content</label>
            <textarea id="review-input" className="form-input" onChange={e => setReview({...review, content: e.target.value})}></textarea>
            <button type="button" id="review-submit-btn" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors id={"review-errors"} message={errors.message} data={errors.data} />}
        </div>
    </div>
  )
}
