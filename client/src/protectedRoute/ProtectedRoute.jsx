import { Navigate, Outlet } from 'react-router-dom'

 const ProtectedRoute=() =>{
    if(localStorage.accesstockenqr){
        return <Outlet/>
    }else{
        return <Navigate to="/login"/>
    }

}
export default ProtectedRoute