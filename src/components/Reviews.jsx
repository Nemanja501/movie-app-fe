import { useContext, useEffect } from "react";
import { TokenContext, UserContext } from "../util/contexts";
import MovieService from "../services/movie-service";

export default function Reviews({reviews}) {
  const {userId} = useContext(UserContext);
  const {token} = useContext(TokenContext);

  useEffect(() =>{
    reviews.forEach(review => {
        const stars = document.querySelectorAll(`#review-stars-${review._id} > i`);
        for(let i = 0; i < review.rating; i++){
            stars[i].classList.add('active-star');
        }
    });
  }, [reviews]);

  async function deleteReview(review){
    if(window.confirm('Do you want to delete your review?')){
        try{
            await MovieService.deleteReview(review, token);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
  }

  return (
    <div>
        <h1 className="subtitle">Reviews:</h1>
        <hr/>
        {reviews.length > 0 ? reviews.map((review, index) =>{
            return <div id="review" key={review._id}>
                <h2 className="subtitle">{review.title}</h2>
                <h2 className="subtitle">by: {review.author}</h2>
                <h2 id="review-date">Posted on: {new Date(review.createdAt).toLocaleDateString()}</h2>
                <div id="review-div" className="rating-div">
                    <h2>Rating: </h2>
                    <div id={`review-stars-${review._id}`} className="ratings">
                        <i className="fa fa-solid fa-star"></i>
                        <i className="fa fa-solid fa-star"></i>
                        <i className="fa fa-solid fa-star"></i>
                        <i className="fa fa-solid fa-star"></i>
                        <i className="fa fa-solid fa-star"></i>
                    </div>
                </div>
                <p className="description">{review.content}</p>
                {userId === review.userId && <button onClick={() => deleteReview(review)} id="delete-review-btn" className="delete-btn">Delete Review</button>}
                <br/>
                {index + 1 < reviews.length && <hr/>}
            </div>
        }) : <h2 className="subtitle">No reviews yet!</h2>}
    </div>
  )
}
