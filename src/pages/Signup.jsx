import { useState } from "react"
import AuthService from "../services/auth-service";
import Errors from "../components/Errors";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });
  const navigate = useNavigate();

  async function handleSubmit(){
    try{
      const data = await AuthService.postSignup(newUser);
      console.log('signup form', data);
      navigate('/login');
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
        <h1 className="page-title">Sign Up</h1>
        <form>
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-input" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}/>
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/>
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})}/>
            <label className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-input" value={newUser.confirmPassword} onChange={e => setNewUser({...newUser, confirmPassword: e.target.value})}/>
            <button type="button" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors message={errors.message} data={errors.data} />}
        </form>
    </div>
  )
}
