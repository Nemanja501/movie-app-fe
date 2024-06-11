import { Link } from "react-router-dom";

export default function MovieCard({movieData}) {
  return (
    <div className="movie-card">
        <h3>{movieData.title}</h3>
        <h4>{movieData.year}</h4>
        <img src={`http://localhost:8080/${movieData.posterUrl}`}></img>
        <Link to={`/movies/${movieData._id}`} className="view-movie-btn">View Movie</Link>
    </div>
  )
}
