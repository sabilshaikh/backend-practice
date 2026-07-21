import { createContext, useState } from "react";
import { login,register,getMe } from "../services/Auth.api";
 
export const AuthContext = createContext();

export function AuthProvider({children}){
const [user , setUser] = useState(null)
const [loading , setLoading] = useState(false)


 const handleLogin =  async (userData , password) => {
    setLoading(true)
    try{
 const response = await login(userData , password)
        setUser(response.user)
    }catch(err){
        console.log(err);
        
       
    }finally{
        setLoading(false)
    }

}


// hnadleRegister

const handleRegister = async (userName , email , password) =>{

    setLoading(true)

    try{
        const response = await register(userName , email , password)

    }catch(err){
        console.log(err);
        
    }finally{
        setLoading(false)
    }
}


return (
    <AuthContext.Provider value={{user , loading , handleLogin , handleRegister}}>
{children}
    </AuthContext.Provider>
)


}



