import React from 'react'
import Userprofile from './Userprofile'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { MdDateRange } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

function Details({details}) {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user} = useSelector((state)=>state.Qr)
  return (
    <div>
      {
        isTabletOrMobile ? 
        <div className='w-full mt-2 pb-4'>
        <p className='font-bold text-xl border-b-[1px] border-gray-400'>Cemetery Information</p>  
        <div className='w-full p-4 mt-2 border-4 border-gray-600 rounded-lg'>
        <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
       <div className='flex flex-col'>
        <p className='w-fit font-bold border-b-[1px] border-dotted border-b-black text-md'>Cemetery Name</p>
        <p> {user?.rejistered?.cemeteryName}</p>
         </div>
        <div className='flex flex-col'>
        <p className='w-fit font-bold border-b-[1px] border-dotted border-b-black text-md'>Cemetery plot number</p>
        <p> {user?.rejistered?.cemeteryPlotNumber}</p>
         </div>
         <div className='flex flex-col'>
        <p className='w-fit font-bold border-b-[1px] border-dotted border-b-black text-md'>Cemetery Location</p>
        <p> {user?.rejistered?.cemeteryLocation}</p>
         </div>
     
         
        </div>
     </div>
     </div>
       </div>
        :
        <div className='w-full mt-2' ref={details}>
        <p className='font-[400] text-[42px] border-b-[1px] pb-2 border-stone-200 mb-4'>Services</p> 
        <div className='w-full flex flex-col space-y-8'>

        <div className='w-full p-4 mt-2 border-4 border-stone-400 rounded-lg'>
        <div className='flex flex-col gap-2'>
        <h4 className='text-[#3b3b3b] text-[22px] font-[600]' style={{fontFamily: 'Poppins, sans-serif'}}>Visitation</h4> 
        <div className='flex flex-col gap-2'>
        <div className='w-full flex gap-8'>
       <div className='flex flex-col gap-2 w-[50%]'>
        <p className='text-[17px] font-[600] text-[#3b3b3b] border-b-[1px] border-dotted border-b-black w-full flex space-x-2 items-center' style={{fontFamily: 'Poppins, sans-serif'}}>
          <FaLocationDot className='w-[21px] h-[21px]'/>
          <span>Location</span>
          </p>
        <p className='text-[16px] font-[400]' style={{fontFamily: 'Poppins, sans-serif'}} > {user?.rejistered?.Vlocation}</p>
         </div>
         <div className='flex flex-col gap-2 w-[50%]'>
        <p className='text-[17px] font-[600] text-[#3b3b3b] border-b-[1px] border-dotted border-b-black w-full flex space-x-2 items-center' style={{fontFamily: 'Poppins, sans-serif'}}>
        <BsCalendarDate className='w-[21px] h-[21px]'/>
          <span>Date & Time</span>
          </p>
        <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[16px] font-[400]'> {user?.rejistered?.Vdate}</p>
        <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[16px] font-[400]'>{user?.rejistered?.Vstarttime} - {user?.rejistered?.Vendtime}</p>
         </div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
        <p className='text-[17px] font-[600] text-[#3b3b3b] border-b-[1px] border-dotted border-b-black flex space-x-2 items-center ' style={{fontFamily: 'Poppins, sans-serif'}}>
        <MdDateRange className='w-[26px] h-[26px]'/>
          <span>Additional Details</span>
          </p>
        <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[16px] font-[400]'> {user?.rejistered?.Vadditionaldetails}</p>
         </div>
         
        </div>
     </div>
     </div>
     <div className='w-full p-4 mt-2 border-4 border-stone-400 rounded-lg'>
        <div className='flex flex-col gap-2'>
        <h4 className='text-[#3b3b3b] text-[22px] font-[600]' style={{fontFamily: 'Poppins, sans-serif'}}>Funeral Service</h4> 
        <div className='flex flex-col gap-2'>
        <div className='w-full flex gap-8'>
       <div className='flex flex-col gap-2 w-[50%]'>
        <p className='text-[17px] font-[600] text-[#3b3b3b] border-b-[1px] border-dotted border-b-black w-full flex space-x-2 items-center' style={{fontFamily: 'Poppins, sans-serif'}}>
          <FaLocationDot className='w-[21px] h-[21px]'/>
          <span>Location</span>
          </p>
        <p className='text-[16px] font-[400]' style={{fontFamily: 'Poppins, sans-serif'}} > {user?.rejistered?.Fslocation}</p>
         </div>
         <div className='flex flex-col gap-2 w-[50%]'>
        <p className='text-[17px] font-[600] text-[#3b3b3b] border-b-[1px] border-dotted border-b-black w-full flex space-x-2 items-center' style={{fontFamily: 'Poppins, sans-serif'}}>
        <BsCalendarDate className='w-[21px] h-[21px]'/>
          <span>Date & Time</span>
          </p>
        <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[16px] font-[400]'> {user?.rejistered?.Fsdate}</p>
        <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[16px] font-[400]'>{user?.rejistered?.Fsstarttime} - {user?.rejistered?.Fsendtime}</p>
         </div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
        <p className='text-[17px] font-[600] text-[#3b3b3b] border-b-[1px] border-dotted border-b-black flex space-x-2 items-center ' style={{fontFamily: 'Poppins, sans-serif'}}>
        <MdDateRange className='w-[26px] h-[26px]'/>
          <span>Additional Details</span>
          </p>
        <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[16px] font-[400]'> {user?.rejistered?.Fsadditionaldetails}</p>
         </div>
         
        </div>
     </div>
     </div>
       </div>
      </div>
      }
     
    </div>
  )
}

export default Details
