import React from 'react'
import Userprofile from './Userprofile'

function Photos() {
  return (
    <Userprofile>
   <div className='p-4 flex flex-col gap-2 rounded-sm'>
       <img className='rounded-lg' src="user.png" alt="" />    
       <p className='font-bold text-md pl-2'>he is very good</p>
    </div>
    <div className='p-4 flex flex-col gap-2 rounded-sm'>
       <img className='rounded-lg' src="user.png" alt="" />    
       <p className='font-bold text-md pl-2'>he is very good</p>
    </div>
    </Userprofile>
  )
}

export default Photos
