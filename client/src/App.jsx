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
        <Route path='/bio' element={<Bio/>}/>
        <Route path='/photos' element={<Photos/>}/>
        <Route path='/videos' element={<Videos/>}/>
        <Route path='/tributes' element={<Tributes/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/createuser' element={<CreateUser/>}/>
      </Routes>
   </div>
  )
}

export default App
