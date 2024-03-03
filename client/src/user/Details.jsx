import React from 'react'
import Userprofile from './Userprofile'

function Details() {
  return (
    <Userprofile>
    <div className=' p-2 mt-2'>
    <div className='flex flex-col gap-2'>
       <p className='font-bold text-lg'>Cemetery Information</p>  
       <div>
        <div className='flex gap-2'>
       <p className='font-bold text-md pl-2'>Cemetery Name:</p>
       <p> Redmond cemetery</p>
        </div>
        <div className='flex gap-2'>
       <p className='font-bold text-md pl-2'>Cemetery plot number:</p>
       <p> Redmond</p>
        </div>
        <div className='flex gap-2'>
       <p className='font-bold text-md pl-2'>Cemetery Location:</p>
       <p> Redmond cemetery</p>
        </div>
       </div>
    </div>
    </div>
    </Userprofile>
  )
}

export default Details
