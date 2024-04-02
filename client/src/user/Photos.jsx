import React from 'react'
import Userprofile from './Userprofile'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import userimage from "../Assets/user.png"


function Photos({photos}) {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user} = useSelector((state)=>state.Qr)
  return (
    <div>
      {
        isTabletOrMobile?
     <div>

        {user?.rejistered?.additionalPhotos.map((photo,index)=>{
          return(
            <div key={index} className='p-4 flex flex-col gap-2 rounded-sm'>
         <img className='rounded-lg' src={photo ? photo : userimage} alt="photo" />    
      </div>
  
      )
    })
     }
    </div>   
        :
        <div  ref={photos}>
        <p className=' text-[rgb(59, 59, 59)] font-[400] text-[42px] border-b-[1px] pb-2 border-stone-200 mb-4'>Photo Gallery</p> 
        <div className='grid grid-cols-3 gap-4 items-center'>
        {user?.rejistered?.additionalPhotos.map((photo,index)=>{
          return(
            <div key={index} className='pt-4 rounded-sm w-full'>
         <img className='rounded-lg' src={photo? photo :userimage} alt="photo" />    
      </div>
  
  )
})
}
    </div> 
</div>
      }
    </div>
  )
}


export default Photos
