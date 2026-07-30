import React from 'react'
import { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Register = () => {



  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

    const {handleRegister,loading} =  useAuth()
// console.log("input leraa...");

  
async function handleSubmit(e){
  e.preventDefault()

  await handleRegister(username , email , password)
  navigate("/")




}

  return (
<main className="register-page">
  <div className="form-container">
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>

<FormGroup 
value={username}
onChange={(e)=>{setUserName(e.target.value)}}
 label={"Name"} placeholder={"Enter your name"}/>    

<FormGroup
value={email}
onChange={(e)=>{setEmail(e.target.value)}}
 label="Email" placeholder="Enter your email" />


<FormGroup 
value={password}
onChange={(e)=>{setPassword(e.target.value)}}
 label="password" placeholder="Enter your password" />

<button className="button" type='submit'>Register</button>

    </form>

    <p>Already have and account ? <Link to="/login">login here</Link></p>
  </div>
</main>
  )
}

export default Register