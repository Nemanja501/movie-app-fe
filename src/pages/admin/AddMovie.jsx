import { useContext, useEffect, useState } from "react";
import Errors from "../../components/Errors";
import { TokenContext, UserContext } from "../../util/contexts";
import MovieService from "../../services/movie-service";
import { useNavigate } from "react-router-dom";
import DirectorService from "../../services/director-service";

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
    userId: userId
  });
  const [directors, setDirectors] = useState([]);
  const navigate = useNavigate();

  async function fetchDirectors(){
    try{
      const data = await DirectorService.getDirectors();
      setDirectors(data.data.directors);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchDirectors();
  }, [])

  async function handleSubmit(){
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('description', movie.description);
    formData.append('year', movie.year);
    formData.append('image', document.querySelector('#image').files[0]);
    formData.append('director', document.querySelector('#director').value);
    formData.append('userId', movie.userId);
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
            <select id="director" className="form-input">
              <option value={''}>Select a director..</option>
              {directors.length > 0 && directors.map(director =>{
                return <option key={director._id} value={director._id}>{director.name}</option>
              })}
            </select>
            <label className="form-label">Year Of Release</label>
            <input type="number" className="form-input" name="year" value={movie.year} onChange={e => setMovie({...movie, year: e.target.value})}></input>
            <label className="form-label">Movie Poster</label>
            <input type="file" className="form-input" name="image" id="image"></input>
            <input type="hidden" name="userId" value={userId}></input>
            <button type="button" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors message={errors.message} data={errors.data} />}
        </form>
    </div>
  )
}
