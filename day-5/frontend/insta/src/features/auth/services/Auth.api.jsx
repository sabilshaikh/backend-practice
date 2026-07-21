import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth",
    withCredentials : true
})

// register function

export async function register(username , email , password) {

    try{

        const response = await api.post("/register",{
            username ,
            email ,
            password
        })

        return response.data

    }catch(err){
        throw err
        
    }
    
}


// login funtion

export async function login(userData , password) {

  try{
const response = await api.post("/login",{
    userData ,
    password
})

return response.data

  }catch(err){
    throw err
  }
    
}


// getMe function

export async function getMe(params) {
    
}