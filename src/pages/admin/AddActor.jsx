import { useContext, useEffect, useState } from "react";
import Errors from "../../components/Errors";
import { TokenContext, UserContext } from "../../util/contexts";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActorService from "../../services/actor-service";

export default function AddActor() {
  const [searchParams] = useSearchParams();
  const [editMode, setEditMode] = useState(searchParams.get('editing'))
  const {userId} = useContext(UserContext);
  const {token} = useContext(TokenContext);
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });
  const [actor, setActor] = useState({
    name: '',
    bio: '',
    age: '',
    image: '',
  });
  const navigate = useNavigate();

  useEffect(() =>{
    if(Boolean(searchParams.get('editing')) === true){
      setEditMode(true);
      fetchActorData();
    }else{
      setEditMode(false);
      setActor({
        name: '',
        bio: '',
        age: '',
        image: '',
      });
    }
  }, [searchParams.get('editing')])

  async function fetchActorData(){
    try{
      const data = await ActorService.getActorData(searchParams.get('id'));
      setActor(data.data.actor);
    }catch(err){
      console.log(err);
    }
  }

  async function handleSubmit(){
    const formData = new FormData();
    formData.append('name', actor.name);
    formData.append('bio', actor.bio);
    formData.append('age', actor.age);
    formData.append('image', document.querySelector('#image').files[0]);
    formData.append('userId', userId);
    try{
      if(editMode){
        await ActorService.editActor(searchParams.get('id'), formData, token);
      }else{
        await ActorService.addActor(formData, token);
      }
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
        <h1 className="page-title">{editMode ? 'Edit Actor' : 'Add Actor'}</h1>
        <form>
            <label className="form-label">Name</label>
            <input type="text" className="form-input" name="name" value={actor.name} onChange={e => setActor({...actor, name: e.target.value})}></input>
            <label className="form-label">Bio</label>
            <textarea className="form-input" name="bio" value={actor.bio} onChange={e => setActor({...actor, bio: e.target.value})}></textarea>
            <label className="form-label">Age</label>
            <input type="number" className="form-input" name="age" value={actor.age} onChange={e => setActor({...actor, age: e.target.value})}></input>
            <label className="form-label">Image</label>
            <input type="file" className="form-input" name="image" id="image"></input>
            <button type="button" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors message={errors.message} data={errors.data} />}
        </form>
    </div>
  )
}
