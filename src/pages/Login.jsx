import { useContext, useState } from "react"
import AuthService from "../services/auth-service";
import Errors from "../components/Errors";
import { AdminContext, TokenContext, UserContext } from "../util/contexts";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setToken} = useContext(TokenContext);
  const { setUserId} = useContext(UserContext);
  const { setIsAdmin } = useContext(AdminContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    message: '',
    data: []
  });

  const navigate = useNavigate();

  async function handleSubmit(){
    try{
      const data = await AuthService.postLogin(user);
      console.log('login form', data);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userId', data.data.userId);
      setToken(data.data.token);
      setUserId(data.data.userId);
      setIsAdmin(data.data.isAdmin);
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
        <h1 className="page-title">Log In</h1>
        <form>
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" value={user.email} onChange={e => setUser({...user, email: e.target.value})}/>
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" value={user.password} onChange={e => setUser({...user, password: e.target.value})}/>
            <button type="button" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors message={errors.message} data={errors.data} />}
        </form>
    </div>
  )
}
