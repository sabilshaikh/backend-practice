import axios from "axios"

const api = axios.create({
baseURL : "http://localhost:3000",
withCredentials : true

})


// register api calling funciton
export async function register(username , email , password) {

    const response = await api.post("/api/auth/register",{
        username,
        email,
        password
    })

    return response.data
    
}

// login api calling funtion

export async function login(userData ,  password) {

    const response = await api.post("/api/auth/login",{
  
        userData,
        password,
    })

  return response.data
    
}

// getme api calling funtion

export async function getMe(){
    const response = await api.get("/api/auth/get-me") 

    return response.data
}

// logout api calling function

export async function logout(){

    const response = await api.get("/api/auth/logout")

    return response.data


}