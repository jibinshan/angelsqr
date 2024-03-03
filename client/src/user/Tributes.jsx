import React from 'react'
import Userprofile from './Userprofile'

function Tributes() {
  return (
    <Userprofile>
    <div className='w-full p-4 flex flex-col gap-2'>
      <button className='bg-blue-600 p-2 w-full text-white border-none'>Create Tribute</button>  
      <div className='flex flex-col gap-2 border-[1px] border-slate-700 p-4 rounded-lg'>
        <div className='flex pt-[10px] items-center gap-2'>
          <img className='w-[40px] h-[40px] rounded-[50px]' src="user.png" alt="" />
          <p className='font-semibold text-lg'>user</p>
        </div>   
          <img src="user.png" alt="" />
          <p className='font-medium text-lg'>hellooooooo</p>
      </div>   
      <div className='flex flex-col gap-2 border-[1px] border-slate-700 p-4 rounded-lg'>
        <div className='flex pt-[10px] items-center gap-2'>
          <img className='w-[40px] h-[40px] rounded-[50px]' src="user.png" alt="" />
          <p className='font-semibold text-lg'>user</p>
        </div>   
          <img src="user.png" alt="" />
          <p className='font-medium text-lg'>hellooooooo</p>
      </div>   
    </div>
    </Userprofile>
  )
}

export default Tributes
