import React from 'react'
import { useMediaQuery } from 'react-responsive'

function Navbar() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <div className='w-full'>
  {isTabletOrMobile ?  
  
    <div className='h-[80px] w-full bg-slate-300 flex pl-4 items-center'>
                    <h1 className='text-blue-600 font-bold text-3xl' style={{ fontFamily: "Preahvihear, sans-serif" }}>AngelsQr</h1>  
    </div>
  : 
  <div className='h-[80px] w-full bg-slate-300 flex pl-16 items-center'>
  <h1 className='text-blue-600 font-bold text-4xl' style={{ fontFamily: "Preahvihear, sans-serif" }}>AngelsQr</h1>  
</div>
  }
    </div>
  )
}

export default Navbar
