import { useEffect, useState } from "react"
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import ActorAndDirectorCard from "../components/ActorAndDirectorCard";
import DirectorService from "../services/director-service";

export default function Directors() {
  const [directors, setDirectors] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);

  async function fetchDirectors(){
    try{
      const data = await DirectorService.getDirectors(page);
      setDirectors(data.data.directors);
      setTotalItems(data.data.totalItems);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchDirectors();
    setSearchParams({page: page});
  }, [page]);


  return (
    <div>
        <h1 className="page-title">Directors</h1>
        {directors.length > 0 ? <><div className="movie-list">
          {directors.map((director, index) =>{
          return <ActorAndDirectorCard key={index} data={director} isActor={false} />
        })}
        </div><Pagination totalItems={totalItems} setPage={setPage}/></> : <h2 className="subtitle">No directors found</h2>}
    </div>
  )
}
