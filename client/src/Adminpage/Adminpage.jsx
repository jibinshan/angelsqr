import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { AiOutlineDashboard } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title } from 'chart.js';
import { NavLink } from 'react-router-dom';
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title);

function Adminpage({children}) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <div>
        {isTabletOrMobile ?
        ""
        :
        <div>
          <div className='h-[70px] w-screen bg-slate-900 flex p-4 gap-[30px] justify-between fixed z-10'>
              <h3 className='ml-[20px] text-blue-300 font-bold text-2xl' style={{ fontFamily: "Preahvihear, sans-serif" }}>AnglesQr</h3>  
              <input
              type="text"
              className='w-2/6 rounded-lg outline-none text-black pl-[15px] '
              placeholder='search users'
              />
              <h4>Admin</h4>  
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
            <NavLink to={"/login"} className={({isActive})=> isActive ? ' p-2 bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center':' p-2 hover:bg-slate-700 font-bold text-lg flex pl-8 gap-4 items-center'} onClick={localStorage.removeItem("accesstokenqr");}>   
                < MdLogout className='font-bold text-2xl'/> Logout
                </NavLink>
          </div> 
         {children}
        </div>
        </div>
        }
    </div>
  )
}

export default Adminpage
