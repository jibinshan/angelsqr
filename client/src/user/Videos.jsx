import React from 'react'
import Userprofile from './Userprofile'

function Videos() {
  return (
    <Userprofile>

    <div className='p-4 flex flex-col gap-2'>
        <video src="linkedin.mp4"></video>
        <h1 className='font-bold text-md pl-2'>videos</h1>      
    </div>
    </Userprofile>
  )
}

export default Videos
