import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/style.css";
import axios from "axios";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUserName] =  useState("")
    const [password , setPassword] = useState("")

    const {handleLogin , loading} = useAuth()
    const navigate = useNavigate()
    if(loading){
      return (
        <h1 className="text-white text-4xl">Loading ...</h1>
      )
    }

  return (
    <div>
      <main className="flex flex-col justify-center items-center h-screen gap-3">
        <h1 className="text-4xl text-white justify-self-start min-w-[500px]">
          Login
        </h1>

        <form

 onSubmit={(e)=>{
            e.preventDefault()
handleLogin(username , password).then((res)=>{
  console.log(res)
  navigate("/")
})
          
          axios.post("http://localhost:3000/api/auth/login",{
            userData : username,
            password : password
          },
          {withCredentials : true}
          ).then((res) =>{
            console.log(res)
            
          })

          }
          }

          className=" flex flex-col justify-center items-center  gap-4 "
          action=""
        >
          <input

          onChange={(e) =>{
            setUserName(e.target.value)
            

          }}

          value={username}
            className="min-w-[500px] p-2 outline-none bg-white rounded-2xl"
            type="text"
            name="username"
            placeholder="Enter username"
          />

          <input

          onChange={(e)=>{
            setPassword(e.target.value)


          }}
          
          value={password}




            className="min-w-[500px] p-2 outline-none bg-white rounded-2xl"
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button
         
           className="bg-red-600 text-white w-[500px] p-2 rounded-2xl">
            Login
          </button>
        </form>

        <p className="text-white ">
          Don't have an account{" "}
          <Link className="text-red-600" to="/register">
            Register
          </Link>{" "}
        </p>
      </main>
    </div>
  );
};

export default Login;
