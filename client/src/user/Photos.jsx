import React from 'react'
import Userprofile from './Userprofile'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import userimage from "../Assets/user.png"


function Photos() {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user} = useSelector((state)=>state.Qr)
  return (
    <Userprofile>
      {
        isTabletOrMobile?
     <div>

        {user?.rejistered?.additionalPhotos.map((photo,index)=>{
          return(
            <div key={index} className='p-4 flex flex-col gap-2 rounded-sm'>
         <img className='rounded-lg' src={userimage} alt="photo" />    
      </div>
  
      )
    })
     }
    </div>   
        :
        <div className='flex flex-col items-center'>

        {user?.rejistered?.additionalPhotos.map((photo,index)=>{
          return(
            <div key={index} className='p-4 flex flex-col gap-2 rounded-sm w-[400px]'>
         <img className='rounded-lg' src={userimage} alt="photo" />    
      </div>
  
      )
    })
     }
    </div> 
      }
    </Userprofile>
  )
}


export default Photos
