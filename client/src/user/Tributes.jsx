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
    <div className='w-full'  ref={tribute}>
     <p className=' text-[#3b3b3b] font-[400] text-[42px] border-b-[1px] pb-2 border-stone-200 mb-4'>Memory Wall</p> 
    <div className='w-full p-2 flex flex-col gap-2 items-center'>
     <button onClick={()=>setCreatetribute(!createtribute)} className='text-black px-[14px] py-[10px] border-[1px] border-[#d1d1d1] text-center rounded-lg font-thin flex justify-center items-center space-x-2 mb-[10px]'><LiaPagerSolid className='w-[30px] h-[30px]'/> <span className='font-[500]'>Write on the memory wall</span></button> 
{
  createtribute  && 

  <Createtribute/>
}
  
  <div className='w-full'>
  {
    isTabletOrMobile ?     
    <div className=' p-0 flex flex-col gap-2 items-center'> 
{user?.rejistered?.tribute.map((tributes,index)=>{
     return(
  <div key={index} className='w-full flex flex-col gap-2 p-4 rounded-lg border border-[rgba(255, 255, 255, 0.7)] shadow-lg shadow-[rgba(170, 170, 170, 0.4)]'>
    <p className='font-[400] pt-2 text-[22px]'>{tributes?.date}</p>
      <p className='font-[400] pt-2 text-[22px]'>{tributes?.comment}</p>
    <div className='flex pt-[10px] items-center gap-2'>
      {/* <img className='w-[40px] h-[40px] rounded-[50px]' src={tributes?.avatar?tributes?.avatar:userimage} alt="" /> */}
      <p className=' w-full font-[500] text-[22px] text-right'>{tributes?.name}</p>
    </div>   
    {
      tributes?.photos &&
      <img className='w-[80px] h-[80px]' src={tributes?.photos && tributes?.photos} alt="" />
    }
  </div>  
  ) 
})}
</div>
    :
<div className=' p-4 flex flex-col gap-2 items-center'> 
{user?.rejistered?.tribute.map((tributes,index)=>{
     return(
  <div key={index} className='w-full flex flex-col gap-2 p-4 rounded-lg border border-[rgba(255, 255, 255, 0.7)] shadow-lg shadow-[rgba(170, 170, 170, 0.4)]'>
    <p className='font-[400] pt-2 text-[22px]'>{tributes?.date}</p>
      <p className='font-[400] pt-2 text-[22px]'>{tributes?.comment}</p>
    <div className='flex pt-[10px] items-center gap-2'>
      {/* <img className='w-[40px] h-[40px] rounded-[50px]' src={tributes?.avatar?tributes?.avatar:userimage} alt="" /> */}
      <p className=' w-full font-[500] text-[22px] text-right'>{tributes?.name}</p>
    </div>   
    {
      tributes?.photos &&
      <img className='w-[80px] h-[80px]' src={tributes?.photos && tributes?.photos} alt="" />
    }
  </div>  
  ) 
})}
</div>
  }
</div>

   
    </div>
    </div>
  )
}

export default Tributes
