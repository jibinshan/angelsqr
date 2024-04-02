import React, { useState } from 'react'
import Userprofile from './Userprofile'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import userimage from "../Assets/user.png"
import { LiaPagerSolid } from "react-icons/lia";
import Createtribute from './Createtribute'

function Tributes({tribute}) {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
const [createtribute,setCreatetribute] = useState(false)
  const {user} = useSelector((state)=>state.Qr)
  return (
    <div>
     <p className=' text-[rgb(59, 59, 59)] font-[400] text-[42px] border-b-[1px] pb-2 border-stone-200 mb-4'>Memory Wall</p> 
    <div className='w-full p-4 flex flex-col gap-2 items-center'>
     <button onClick={()=>setCreatetribute(!createtribute)} className='bg-stone-600 hover:bg-stone-800 p-4 text-white border-none text-center rounded-lg font-thin flex justify-center items-center space-x-2'><LiaPagerSolid className='w-[30px] h-[30px]'/> <span className='font-[500]'>Create Tribute</span></button> 
{
  createtribute ? 
  <Createtribute/>
  :
  <div>
  {
    isTabletOrMobile ?     
    <div className='w-full p-4 flex flex-col gap-2'> 
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
<div className='w-full p-4 flex flex-col gap-2 items-center' ref={tribute}> 
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
</div>
}
   
    </div>
    </div>
  )
}

export default Tributes
