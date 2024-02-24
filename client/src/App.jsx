import { Route, Routes } from "react-router-dom"
import Adminpage from "./Adminpage/Adminpage"
import Dashboard from "./Adminpage/Dashboard"
import GenerateQr from "./Adminpage/GenerateQr"
import Users from "./Adminpage/Users"
import Login from "./login/Login"
import ProtectedRoute from "./protectedRoute/ProtectedRoute"


function App() {
  
  return (
   <div>
     <Routes>
        <Route path='/login' element={<Login/>}/>
     <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/generateqr' element={<GenerateQr/>}/>
        <Route path='/users' element={<Users/>}/>
      </Route>
      </Routes>
   </div>
  )
}

export default App
