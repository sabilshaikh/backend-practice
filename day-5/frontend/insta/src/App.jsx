import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'




const App = () => {
  return (
 <>


<Routes>

<Route path='/' element={ <h1>welcome to the page</h1>} />
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />

</Routes>

 </>
  )
}

export default App