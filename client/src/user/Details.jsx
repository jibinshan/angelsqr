import React from 'react'
import Userprofile from './Userprofile'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

function Details() {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user} = useSelector((state)=>state.Qr)
  return (
    <Userprofile>
      <div className='w-full mt-2'>
       <p className='font-bold text-xl border-b-[1px] border-gray-400'>Cemetery Information</p>  
       <div className='w-full p-4 mt-2 border-4 border-gray-600 rounded-lg'>
       <div className='flex flex-col gap-2'>
       <div>
        <div className='flex gap-2'>
       <p className='font-bold text-md '>Cemetery Name:</p>
       <p> {user?.rejistered?.cemeteryName}</p>
        </div>
        <div className='flex gap-2'>
       <p className='font-bold text-md'>Cemetery plot number:</p>
       <p> {user?.rejistered?.cemeteryPlotNumber}</p>
        </div>
        <div className='flex gap-2'>
       <p className='font-bold text-md'>Cemetery Location:</p>
       <p> {user?.rejistered?.cemeteryLocation}</p>
        </div>
       </div>
    </div>
    </div>
      </div>
    </Userprofile>
  )
}

export default Details
