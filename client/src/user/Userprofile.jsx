
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { qrasync } from '../reduxtoolkit/Qrredux'

function Userprofile({children}) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const dispatch = useDispatch()
    const {qrids} = useSelector((state)=>state.Qr)
    const {user} = useSelector((state)=>state.Qr)
    console.log(user,"=iouooii");
    const fetchdata = async()=>{
      dispatch(qrasync())
    }
    useEffect(()=>{
       fetchdata()
    },[])
    return (
      <div className='text-black'>
      {
        isTabletOrMobile
        ?
        <div>
        <img className='w-full h-[150px] rounded-b-xl' src="\public\flowers.png" alt="" />
        <div className=' w-full  flex flex-col items-center  pl-4 pr-4 gap-2'>
         <div className='p-[5px] rounded-[50%] bg-white absolute top-[100px]'>
          <img className='w-[150px] h-[150px] rounded-[50%]' src="\public\mammotty.png" alt="user" />
         </div>
          <h1 className='font-bold text-xl mt-[120px]'>{user?.rejistered?.username}</h1>
          <div>
          <p className='text-center font-bold'>Lifetime:</p>
          <p>{user?.rejistered?.dateOfBirth} - {user?.rejistered?.dateOfDeath}</p>
          </div>
          <p className='pb-2 text-center font-semibold'>{user?.rejistered?.about}</p>
          <div className='flex gap-4 shadow-lg'>
            <NavLink to={`/bio/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg text-black border-none' }>Bio</NavLink>
            <NavLink to={`/photos/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Photos</NavLink>
            <NavLink to={`/videos/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' } >Videos</NavLink>
            <NavLink to={`/tributes/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Tributes</NavLink>
            <NavLink to={`/details/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Details</NavLink>
        </div>
            {children}
       </div>
      </div>
        :
        <div className='pl-4 pr-4 mt-4'> 
        <img className='w-full h-[250px] rounded-2xl' src="\public\flowers.png" alt="" />
        <div className=' w-full  flex flex-col items-center  pl-4 pr-4 gap-4'>
         <div className='p-[5px] rounded-[50%] bg-white absolute top-[100px]'>
          <img className='w-[250px] h-[250px] rounded-[50%]' src="\public\mammotty.png" alt="user" />
         </div>
          <h1 className='font-bold text-4xl mt-[110px]'>{user?.rejistered?.username}</h1>
          <div>
          <p className='text-center font-bold text-xl'>Lifetime:</p>
          <p className='text-xl'>{user?.rejistered?.dateOfBirth} - {user?.rejistered?.dateOfDeath}</p>
          </div>
          <p className='pb-2 text-center font-semibold text-2xl'>{user?.rejistered?.about}</p>
          <div className='flex gap-6'>
            <NavLink to={`/bio/${qrids}`} className={({isActive})=>isActive ?'font-bold text-xl border-[2px] border-blue-600 text-blue-600 p-4 rounded-xl' :'font-bold text-xl text-black border-[2px] border-black p-4 rounded-xl' }>Bio</NavLink>
            <NavLink to={`/photos/${qrids}`} className={({isActive})=>isActive ?'font-bold text-xl border-[2px] border-blue-600 text-blue-600 p-4 rounded-xl' :'font-bold text-xl text-black border-[2px] border-black p-4 rounded-xl' }  >Photos</NavLink>
            <NavLink to={`/videos/${qrids}`} className={({isActive})=>isActive ?'font-bold text-xl border-[2px] border-blue-600 text-blue-600 p-4 rounded-xl' :'font-bold text-xl text-black border-[2px] border-black p-4 rounded-xl' } >Videos</NavLink>
            <NavLink to={`/tributes/${qrids}`} className={({isActive})=>isActive ?'font-bold text-xl border-[2px] border-blue-600 text-blue-600 p-4 rounded-xl' :'font-bold text-xl text-black border-[2px] border-black p-4 rounded-xl' }  >Tributes</NavLink>
            <NavLink to={`/details/${qrids}`} className={({isActive})=>isActive ?'font-bold text-xl border-[2px] border-blue-600 text-blue-600 p-4 rounded-xl' :'font-bold text-xl text-black border-[2px] border-black p-4 rounded-xl' }  >Details</NavLink>
        </div>
        <div className='w-[700px] pb-4 text-xl'>
            {children}
        </div>
       </div>
      </div>
      }
    </div>
  )
}

export default Userprofile