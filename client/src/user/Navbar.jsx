import React from 'react'
import { useMediaQuery } from 'react-responsive'

function Navbar() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <div className='w-full'>
  {isTabletOrMobile ?  
  
    <div className='h-[80px] w-full flex pl-4 items-center'>
       <h1 className='text-stone-700 font-bold text-3xl'>AngelsQr</h1>  
    </div>
  : 
  <div className='h-[80px] w-full flex pl-16 items-center'>
  <h1 className='text-stone-700 font-semibold text-4xl'>AngelsQr</h1>  
</div>
  }
    </div>
  )
}

export default Navbar
