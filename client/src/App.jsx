import { Route, Routes } from "react-router-dom"
import Adminpage from "./Adminpage/Adminpage"
import Dashboard from "./Adminpage/Dashboard"
import GenerateQr from "./Adminpage/GenerateQr"
import Users from "./Adminpage/Users"
import Login from "./login/Login"
import ProtectedRoute from "./protectedRoute/ProtectedRoute"
import Navbar from "./user/Navbar"
import Userprofile from "./user/Userprofile"
import Bio from "./user/Bio"
import Photos from "./user/Photos"
import Videos from "./user/Videos"
import Tributes from "./user/Tributes"
import Details from "./user/Details"
import CreateUser from "./user/CreateUser"
import Scanqr from "./protectedRoute/Scanqr"
import Createtribute from "./user/Createtribute"
import "./app.css"



function App() {
  
  return (
   <div>
     <Routes>
        <Route path='/userprofile/:qrid' element={<Userprofile/>}/>
        <Route path='/scanqr/:qrId' element={<Scanqr/>}/>
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
