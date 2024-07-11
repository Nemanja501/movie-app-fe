import { useEffect, useState } from 'react'
import Router from './Router'
import { AdminContext, TokenContext, UserContext } from './util/contexts';
import AuthService from './services/auth-service';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [isAdmin, setIsAdmin] = useState(false);


  async function fetchIsAdmin(){
    if(userId){
      const data = await AuthService.getIsAdmin(userId);
      setIsAdmin(data.data.isAdmin);
    }
  }
  useEffect(() =>{
    fetchIsAdmin();
  }, [])


  return (
    <>
    <TokenContext.Provider value={{token, setToken}}>
      <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <UserContext.Provider value={{ userId, setUserId }}>
        <Router/>
      </UserContext.Provider>
      </AdminContext.Provider>
    </TokenContext.Provider>
      
    </>
  )
}

export default App
