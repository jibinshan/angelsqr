import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'

function Userprofile({children}) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <div className='text-black'>
        <Navbar/>
      {
        isTabletOrMobile
        ?
       <div className=' w-full mt-[40px] flex flex-col items-center pl-4 pr-4 gap-2'>
          <img className='w-[100px] h-[100px] rounded-[50px]' src="user.png" alt="user" />
          <h1 className='font-bold text-xl'>User</h1>
          <div>
          <p className='text-center font-bold'>Lifetime:</p>
          <p>jun 30, 1944 - jun 25, 2015</p>
          </div>
          <p className='pb-2 text-center font-semibold'>there is no limit to what you can do if you dont care who gets the credit</p>
          <div className='flex gap-4 shadow-lg'>
            <NavLink to={'/bio'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg text-black border-none' }>Bio</NavLink>
            <NavLink to={'/photos'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Photos</NavLink>
            <NavLink to={'/videos'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' } >Videos</NavLink>
            <NavLink to={'/tributes'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Tributes</NavLink>
            <NavLink to={'/details'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Details</NavLink>
        </div>
            {children}
       </div>
        :
        <div className=' w-full mt-[40px] flex flex-col items-center pl-4 pr-4 gap-2'>
        <img className='w-[100px] h-[100px] rounded-[50px]' src="user.png" alt="user" />
        <h1 className='font-bold text-xl'>User</h1>
        <div>
        <p className='text-center font-bold'>Lifetime:</p>
        <p>jun 30, 1944 - jun 25, 2015</p>
        </div>
        <p className='pb-2 text-center font-semibold'>there is no limit to what you can do if you dont care who gets the credit</p>
        <div className='flex gap-4 shadow-lg'>
          <NavLink to={'/bio'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg text-black border-none' }>Bio</NavLink>
          <NavLink to={'/photos'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Photos</NavLink>
          <NavLink to={'/videos'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' } >Videos</NavLink>
          <NavLink to={'/tributes'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Tributes</NavLink>
          <NavLink to={'/details'} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Details</NavLink>
      </div>
      <div className='w-4/12 flex flex-col justify-center'>

          {children}
      </div>
     </div>
      }
    </div>
  )
}

export default Userprofile