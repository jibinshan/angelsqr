import React from 'react'
import Userprofile from './Userprofile'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import examplevideo from "../Assets/example.mp4"

function Videos() {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user} = useSelector((state)=>state.Qr)
  return (
    <Userprofile>
   {user?.rejistered?.additionalVideos.map((video,index)=>{
        return(
          <div key={index} className='p-4 flex flex-col gap-2'>
          <video src={examplevideo}></video>   
      </div>

        )
      })
  }
   
    </Userprofile>
  )
}
export default Videos
