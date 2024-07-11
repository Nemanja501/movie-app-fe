import { useEffect, useState } from "react"
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import ActorService from "../services/actor-service";
import ActorAndDirectorCard from "../components/ActorAndDirectorCard";

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);

  async function fetchActors(){
    try{
      const data = await ActorService.getActors(page);
      setActors(data.data.actors);
      setTotalItems(data.data.totalItems);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchActors();
    setSearchParams({page: page});
  }, [page]);


  return (
    <div>
        <h1 className="page-title">Actors</h1>
        {actors.length > 0 ? <><div className="movie-list">
          {actors.map((actor, index) =>{
          return <ActorAndDirectorCard key={index} data={actor} isActor={true} />
        })}
        </div><Pagination totalItems={totalItems} setPage={setPage}/></> : <h2 className="subtitle">No actors found</h2>}
    </div>
  )
}
