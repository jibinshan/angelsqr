import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { AiOutlineDashboard } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title } from 'chart.js';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title);

function Adminpage({children}) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [users,setUsers] = useState([])
    const [input,setInput] = useState('')
    const [filtereduser,setFiltereduser] = useState([])
    const api = "https://angelsqr-3.onrender.com/user/getusers"
    const fetchdata = async()=>{
      try {
        const response = await axios(api)
        setUsers(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
       fetchdata()
    },[])
    const handleuserchange = (e)=>{
      setInput(e.target.value)
      const filtereduser = users.filter((user)=>{
        return user.username.toLowerCase().includes(e.target.value.toLowerCase());
      })
      setFiltereduser(filtereduser);
    }

  return (
    <div>
        {isTabletOrMobile ?
        ""
        :
        <div className='text-white'>
          <div className=' flex flex-col items-center fixed z-10 '>
             <div className='h-[70px] w-screen bg-slate-900 flex p-4 gap-[30px] justify-between'>
             <h3 className='ml-[20px] text-blue-300 font-bold text-2xl' style={{ fontFamily: "Preahvihear, sans-serif" }}>AnglesQr</h3>  
              <input
              type="text"
              className='w-2/6 rounded-lg outline-none text-black pl-[15px] '
              placeholder='search users'
              onChange={handleuserchange}
              />
              <h4>Admin</h4> 
              </div> 
          { 
             input !== "" &&
             <div className='w-[400px] h-fit bg-slate-700 p-4 pl-2 flex flex-col gap-2'>
              {filtereduser.map((user)=>{
                return(
                  <div key={user._id} className='flex gap-2'>
                    <img src={user.profilePhoto ? user.profilePhoto : "/user.png"} alt='' />
                    <p>{user.username}</p>
                  </div>
                )
              })}
             </div>
          }      
          </div>
        

          
          <div>
           <div className='h-screen w-[250px] fixed bg-slate-900 flex flex-col gap-4'>
           <NavLink to={"/"} className={({isActive})=> isActive ? 'mt-[100px] p-2 bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center':'mt-[100px] p-2 hover:bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center'}>
             <AiOutlineDashboard className='font-bold text-2xl'/> Dashboard
            </NavLink> 
            <NavLink to={"/generateqr"} className={({isActive})=> isActive ? ' p-2 bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center':' p-2 hover:bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center'}>   
                <IoQrCodeOutline className='font-bold text-2xl'/> Generate Qr
                </NavLink>   
            <NavLink to={"/users"} className={({isActive})=> isActive ? ' p-2 bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center':' p-2 hover:bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center'}>    
                <FaUsers className='font-bold text-2xl'/> Users
                </NavLink>
            <NavLink to={"/login"} className={({isActive})=> isActive ? ' p-2 bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center':' p-2 hover:bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center'} onClick={localStorage.clear()}>   
                < MdLogout className='font-bold text-2xl'/> Logout
                </NavLink>
          </div> 
          <div className='rext-white'>

         {children}
          </div>
        </div>
        </div>
        }
    </div>
  )
}

export default Adminpage
