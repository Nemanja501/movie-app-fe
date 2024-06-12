import { useContext, useState } from "react";
import Errors from "../../components/Errors";
import { TokenContext, UserContext } from "../../util/contexts";
import { useNavigate } from "react-router-dom";
import DirectorService from "../../services/director-service";

export default function AddDirector() {
  const {userId} = useContext(UserContext);
  const {token} = useContext(TokenContext);
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });
  const [director, setDirector] = useState({
    name: '',
    bio: '',
    age: '',
    image: '',
    userId: userId
  });
  const navigate = useNavigate();

  async function handleSubmit(){
    const formData = new FormData();
    formData.append('name', director.name);
    formData.append('bio', director.bio);
    formData.append('age', director.age);
    formData.append('image', document.querySelector('#image').files[0]);
    formData.append('userId', director.userId);
    try{
      await DirectorService.addDirector(formData, token);
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
        <h1 className="page-title">Add Director</h1>
        <form>
            <label className="form-label">Name</label>
            <input type="text" className="form-input" name="name" value={director.name} onChange={e => setDirector({...director, name: e.target.value})}></input>
            <label className="form-label">Bio</label>
            <textarea className="form-input" name="bio" value={director.bio} onChange={e => setDirector({...director, bio: e.target.value})}></textarea>
            <label className="form-label">Age</label>
            <input type="number" className="form-input" name="age" value={director.age} onChange={e => setDirector({...director, age: e.target.value})}></input>
            <label className="form-label">Image</label>
            <input type="file" className="form-input" name="image" id="image"></input>
            <input type="hidden" name="userId" value={userId}></input>
            <button type="button" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors message={errors.message} data={errors.data} />}
        </form>
    </div>
  )
}
