import { useContext, useEffect } from "react"
import {login , register , getMe , logout} from "../services/auth.api"
import { authContext } from "../Auth.context"


export const useAuth = () =>{

    const context = useContext(authContext)
    const {user , setUser , loading , setLoading} = context

    
    

    // handle Register created 

    async function handleRegister(username , email , password){
        setLoading(true)

        const data = await register(username , email , password);

        setUser(data.user);

        setLoading(false)

    }
 

    // handle Login created

    async function handleLogin(userData  , password) {

        setLoading(true)
        const data = await login(userData , password)
        setUser(data.user)
        setLoading(false)
        
    }


    // getMe created

    async function handleGetMe(){
        setLoading(true)
        const data = await getMe();
        setUser(data.user)
        setLoading(false)
   


    }


    // logout created

    async function handleLogout(){
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

useEffect(()=>{
handleGetMe();
},[])

return({
    user,loading, handleRegister,handleLogin,handleLogout,handleGetMe
})

}

