import React from 'react'
import "../src/features/auth/style/style.css"
import { Routes , Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const App = () => {
  return (
<div className='h-screen w-screen bg-[#0b0808]'>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/login" element={<Login/>}/>
<Route path='/register' element={<Register/>}  />

</Routes>

</div>
  )
}

export default App