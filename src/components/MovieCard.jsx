export default function MovieCard({movieData}) {
  return (
    <div>
        <h3>{movieData.title}</h3>
        <h4>{movieData.year}</h4>
        <img src={`http://localhost:8080/${movieData.posterUrl}`}></img>
        <p>{movieData.description}</p>
    </div>
  )
}
