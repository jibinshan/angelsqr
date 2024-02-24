import axios from 'axios'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

function Login() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const navigate = useNavigate()
    const [login,setLogin] = useState({
        name:'',
        password:''
    })
    const handleinputchange = (e)=>{
          setLogin((prev)=>({
            ...prev,
           [e.target.name]:e.target.value
          }))
    }
    const api ="https://angelsqr-3.onrender.com/admin/login"
    const loginclick = async(e)=>{
          e.preventDefault()
          try {
            const response = await axios(api,{
                method:"POST",
                data:login
            })
            localStorage.setItem('accesstockenqr', response.data.accesstocken);      
            console.log(response,"====");  
            if (response.status === 200) {      
              navigate("/")
            }   
          } catch (error) {
            console.log(error);
          }
    }
  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center items-center text-black ">
      
    <form action="" className={isTabletOrMobile
    ?"flex flex-col gap-4 w-fit bg-white  rounded-md shadow-xl justify-between"
    :"flex flex-col gap-4 bg-white  rounded-md shadow-xl w-[300px] h-[300px] justify-between"
}>
      <h1 className='text-center text-white text-xl font-bold p-4 bg-blue-500 rounded-t-md'>Admin Login</h1>
   <div className='flex flex-col gap-6 p-4'>
    <input
    className='w-full shadow-md  outline-none p-2 border-solid border-[1px] border-slate-500'
    type="text" 
    placeholder='Username'
    name='name'
    onChange={handleinputchange}
    />
    <input 
    className='w-full shadow-md outline-none p-2 border-solid border-[1px] border-slate-500'
    type="password" 
    placeholder='Password'
    name='password'
    onChange={handleinputchange} 
    />
   <button className='bg-blue-900 hover:bg-blue-500 text-white p-1 rounded-md pt-2 pb-2 font-extrabold'
   type='submit'
   onClick={loginclick}
   >Login</button>
   </div>
 </form> 
</div>
  )
}

export default Login
