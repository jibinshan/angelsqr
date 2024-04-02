import React from 'react'
import Userprofile from './Userprofile'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import examplevideo from "../Assets/example.mp4"

function Videos() {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user} = useSelector((state)=>state.Qr)
  console.log(user?.rejistered?.additionalVideos,"====videos");
  return (
    <div>
      {
        isTabletOrMobile ?
        
        user?.rejistered?.additionalVideos.map((video,index)=>{
          return(
            <div key={index} className='p-4 flex flex-col gap-2'>
            <video autoPlay controls src={video && video}></video>   
        </div>
  
          )
        })
    
        
        :
        
        user?.rejistered?.additionalVideos.map((video,index)=>{
          return(
            <div key={index} className='p-4 flex flex-col gap-2'>
            <video autoPlay controls src={video && video}></video>   
        </div>
  
          )
        })
        
      }
  
   
    </div>
  )
}
export default Videos
