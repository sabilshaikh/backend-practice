
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import "./features/shared/styles/global.scss"
import { AuthProvider } from './features/auth/Auth.context'




function App() {


  return (
    <AuthProvider>
   <RouterProvider router={router}/>
    </AuthProvider>

  )
}

export default App

// 27 ko yaha chord ke gaya tha mai vidio duration 21 minute ke pass 