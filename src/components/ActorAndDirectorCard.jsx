import { Link} from "react-router-dom";

export default function ActorAndDirectorCard({data, isActor}) {

  return (
    <div className='actor-director-card'>
        <h3>{data.name}</h3>
        <img src={`http://localhost:8080/${data.imageUrl}`}></img>
        <Link to={isActor ? `/actors/${data._id}` : `/directors/${data._id}`} className={isActor ? "view-movie-btn" : "view-director-btn"}>{isActor ? 'View Actor' : 'View Director'}</Link>
    </div>
  )
}

