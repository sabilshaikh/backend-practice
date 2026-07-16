import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../style/style.css"
import axios from 'axios'

const Register = () => {

    const [username, setUserName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    // console.log(username);
    // console.log(email);
    
    
  return (
    <div>

<main className='flex flex-col justify-center items-center h-screen gap-2'>

    <h1 className='text-4xl text-white justify-self-start min-w-[500px]' >Register</h1>
    <form
    
    onSubmit={(e)=>{
        e.preventDefault();

    //   console.log({
    //     username : username,
    //     email : email,
    //     password : password
    //   })


    axios.post("http://localhost:3000/api/auth/register",{
        userName : username,
        email : email,
        password : password,
        bio : "hello from fronend"
    }).then((res)=>{
        console.log(res.data)
    })




    }}

     className=' flex flex-col justify-center items-center  gap-4 ' >
 
 <input
  onChange={(e)=>{
    setUserName(e.target.value)

  }}

  value={username}
 
  className='min-w-[500px] p-2 outline-none bg-white rounded-2xl '  type="text" name='username' placeholder='Enter username' />

 <input
 
 onChange={(e)=>{
    setEmail(e.target.value)

 }}
 value={email}
 
  className='min-w-[500px] p-2 outline-none bg-white rounded-2xl  ' type="email" name="email" placeholder='Enter email' />

 <input 
 onChange={(e)=>{
    setPassword(e.target.value)

 }}

 value={password}
 className='min-w-[500px] p-2 outline-none bg-white rounded-2xl ' type="password" name='password' placeholder='Enter password'  />
 <button className='min-w-[500px] p-2 outline-none bg-red-600 text-white rounded-2xl' >Register</button>

    </form>
<p className='text-white '>Already have an account ? <Link className='text-red-600' to="/login" >Login</Link></p>

</main>

    </div>
  )
}

export default Register