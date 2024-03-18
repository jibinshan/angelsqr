import React from 'react'
import Userprofile from './Userprofile'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import userimage from "../Assets/user.png"

function Tributes() {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user} = useSelector((state)=>state.Qr)
  return (
    <Userprofile>
      {
        isTabletOrMobile ?     
        <div className='w-full p-4 flex flex-col gap-2'> 
      <Link to="/createtribute" state={{ userid: user?.rejistered?._id, qrid:user?.qrId }} className='bg-blue-600 p-2 w-full text-white border-none text-center rounded-lg'>Create Tribute</Link> 
    {user?.rejistered?.tribute.map((tributes,index)=>{
         return(
      <div key={index} className='flex flex-col gap-2 border-[1px] border-slate-700 p-4 rounded-lg'>
        <div className='flex pt-[10px] items-center gap-2'>
          <img className='w-[40px] h-[40px] rounded-[50px]' src={tributes?.avatar?tributes?.avatar:userimage} alt="" />
          <p className='font-semibold text-lg'>{tributes?.name}</p>
        </div>   
          <img src={tributes?.photos && tributes?.photos} alt="" />
          <p className='font-medium text-lg'>{tributes?.comment}</p>
      </div>  
      ) 
    })}
    </div>
        :
    <div className='w-full p-4 flex flex-col gap-2 items-center'> 
      <Link to="/createtribute" state={{ userid: user?.rejistered?._id }} className='bg-blue-600 hover:bg-blue-800 p-4 text-white border-none text-center rounded-lg'>Create Tribute</Link> 
    {user?.rejistered?.tribute.map((tributes,index)=>{
         return(
      <div key={index} className='w-full flex flex-col gap-2 border-[1px] border-slate-700 p-4 rounded-lg'>
        <div className='flex pt-[10px] items-center gap-2'>
          <img className='w-[40px] h-[40px] rounded-[50px]' src={tributes?.avatar?tributes?.avatar:userimage} alt="" />
          <p className='font-semibold text-lg'>{tributes?.name}</p>
        </div>   
          <p className='font-medium pt-2 text-lg'>{tributes?.comment}</p>
          <img className='w-[80px] h-[80px]' src={tributes?.photos && tributes?.photos} alt="" />
      </div>  
      ) 
    })}
    </div>
      }
    </Userprofile>
  )
}

export default Tributes
