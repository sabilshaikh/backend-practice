import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'




const App = () => {
  return (
 <>


<Routes>

<Route path='/' element={<h1 className='text-5xl text-green-800 bg-black h-screen w-screen flex justify-center items-center' > Welcome to the page </h1>}/>

<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />

</Routes>

 </>
  )
}

export default App