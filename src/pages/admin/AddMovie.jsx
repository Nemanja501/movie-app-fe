import { useContext, useEffect, useState } from "react";
import Errors from "../../components/Errors";
import { TokenContext, UserContext } from "../../util/contexts";
import MovieService from "../../services/movie-service";
import { useNavigate } from "react-router-dom";
import DirectorService from "../../services/director-service";
import ActorService from "../../services/actor-service";
import Select from "react-select";
import customStyles from "../../util/react-select-styles";

export default function AddMovie() {
  const {userId} = useContext(UserContext);
  const {token} = useContext(TokenContext);
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    year: '',
    image: '',
    director: '',
    actors: []
  });
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();

  async function fetchDirectorsAndActors(){
    try{
      const directorData = await DirectorService.getDirectors();
      const actorData = await ActorService.getActors();
      setDirectors(directorData.data.directors);
      setActors(actorData.data.actors);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchDirectorsAndActors();
  }, [])

  async function handleSubmit(){
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('description', movie.description);
    formData.append('year', movie.year);
    formData.append('image', document.querySelector('#image').files[0]);
    formData.append('director', movie.director);
    movie.actors.forEach(actor =>{
      formData.append('actors[]', actor.value._id);
    })
    formData.append('userId', userId);
    console.log(formData);
    try{
      await MovieService.addMovie(formData, token);
      navigate('/');
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
    <div>
        <h1 className="page-title">Add Movie</h1>
        <form>
            <label className="form-label">Title</label>
            <input type="text" className="form-input" name="title" value={movie.title} onChange={e => setMovie({...movie, title: e.target.value})}></input>
            <label className="form-label">Description</label>
            <textarea className="form-input" name="description" value={movie.description} onChange={e => setMovie({...movie, description: e.target.value})}></textarea>
            <label className="form-label">Director</label>
            <select id="director" className="form-input" defaultValue={movie.director} onChange={e => setMovie({...movie, director: e.target.value})}>
              <option value={''}>Select a director..</option>
              {directors.length > 0 && directors.map(director =>{
                return <option key={director._id} value={director._id}>{director.name}</option>
              })}
            </select>
            <label className="form-label">Actors</label>
            {actors.length > 0 && <Select styles={customStyles} isMulti placeholder={'Select an actor...'} name="actors[]" value={movie.actors} onChange={e => setMovie({...movie, actors: e})} options={actors.map(actor =>{
              return {label: actor.name, value: actor}
            })}></Select>}
            <label className="form-label">Year Of Release</label>
            <input type="number" className="form-input" name="year" value={movie.year} onChange={e => setMovie({...movie, year: e.target.value})}></input>
            <label className="form-label">Movie Poster</label>
            <input type="file" className="form-input" name="image" id="image"></input>
            <button type="button" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors message={errors.message} data={errors.data} />}
        </form>
    </div>
  )
}
