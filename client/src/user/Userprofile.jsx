
import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Navbar from './Navbar'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getQrid, qrasync } from '../reduxtoolkit/Qrredux'
import flowerimage from "../Assets/flowers.png"
import bgflower from "../Assets/bgflower.jpg"
import userimage from "../Assets/user.png"
import { IoBookSharp } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { FaPenToSquare } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import Bio from './Bio'
import Photos from './Photos'
import Tributes from './Tributes'
import Details from './Details'

function Userprofile({children}) {
  const dispatch = useDispatch()
  const {qrid} = useParams()
  dispatch(getQrid(qrid))
  const bio = useRef()
  const photos = useRef()
  const tribute = useRef()
  const details = useRef()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const {qrids} = useSelector((state)=>state.Qr)
    const {user} = useSelector((state)=>state.Qr)
    console.log(user,"=iouooii");
    const fetchdata = async()=>{
      dispatch(qrasync())
    }
    const scrollhandler = (elmref)=>{
      console.log(elmref.current,"==elmref");
        window.scrollTo({top:elmref.current.offsetTop,behavior:"smooth"})
    }
    useEffect(()=>{
      fetchdata()
    },[])
    return (
      <div className='text-black'>
      {
        isTabletOrMobile
        ?
        <div>
        <img className='image w-full h-[150px] rounded-b-xl' src={user?.rejistered?.coverImage && user?.rejistered?.coverImage} alt="" />
        <div className=' w-full  flex flex-col items-center  pl-4 pr-4 gap-2'>
         <div className='p-[5px] rounded-[50%] bg-white absolute top-[100px]'>
          <img className='w-[150px] h-[150px] rounded-[50%]' src={user?.rejistered?.profilePhoto?user?.rejistered?.profilePhoto:userimage} alt="user" />
         </div>
          <h1 className='font-bold text-xl mt-[120px]'>{user?.rejistered?.username}</h1>
          <div>
          <p className='text-center font-bold'>Lifetime:</p>
          <p>{user?.rejistered?.dateOfBirth} - {user?.rejistered?.dateOfDeath}</p>
          </div>
          <p className='pb-2 text-center font-semibold'>{user?.rejistered?.about}</p>
          <div className='flex gap-4 shadow-lg'>
            <NavLink to={`/bio/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg text-black border-none' }>Bio</NavLink>
            <NavLink to={`/photos/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Photos</NavLink>
            <NavLink to={`/videos/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' } >Videos</NavLink>
            <NavLink to={`/tributes/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Tributes</NavLink>
            <NavLink to={`/details/${qrids}`} className={({isActive})=>isActive ?'font-bold text-lg border-b-[2px] border-blue-600 text-blue-600' :'font-bold text-lg' }  >Details</NavLink>
        </div>
            {children}
       </div>
      </div>
        :
        <div className='pl-4 pr-4 mt-4'> 
        <img className='image w-full h-[250px] rounded-2xl' src={user?.rejistered?.coverImage && user?.rejistered?.coverImage} alt="" />
        <div className=' w-full  flex flex-col items-center  pl-4 pr-4 gap-[5px]'>
         <div className='p-[5px] rounded-[50%] bg-white absolute top-[100px]'>
          <img className='w-[250px] h-[250px] rounded-[50%]' src={user?.rejistered?.profilePhoto?user?.rejistered?.profilePhoto:userimage} alt="user" />
         </div>
          <h1 className='font-thin text-[#3b3b3b] text-[64px] mt-[70px]'>{user?.rejistered?.username}</h1>
           <p className='text-[26px] text-[#3b3b3b]'>{user?.rejistered?.dateOfBirth} - {user?.rejistered?.dateOfDeath}</p>
           <p className='pb-4 text-center text-[26px] text-[#3b3b3b] font-thin w-[800px]'>{user?.rejistered?.about}</p>
          <div className='flex gap-6'>
            <ul className='flex space-x-4'>
            <li onClick={()=>scrollhandler(bio)} className= ' cursor-pointer text-3xl text-[#3b3b3b] font-thin border-[1px] border-black p-4 rounded-xl flex items-center space-x-2 w-[170px] justify-center'><IoBookSharp className='h-[30px] w-[30px]'/><span>Bio</span></li>
            <li onClick={()=>scrollhandler(photos)} className='cursor-pointer text-3xl text-[#3b3b3b] font-thin border-[1px] border-black p-4 rounded-xl flex items-center space-x-2 w-[170px] justify-center'   ><IoMdPhotos className='h-[30px] w-[30px]'/><span>Photos</span></li>
            {/* <li  className='cursor-pointer text-3xl text-[#3b3b3b] font-thin border-[1px] border-black p-4 rounded-xl flex items-center space-x-2 w-[170px] justify-center'  ><BiSolidVideos  className='h-[30px] w-[30px]'/><span>Videos</span></li> */}
            <li onClick={()=>scrollhandler(tribute)} className='cursor-pointer text-3xl text-[#3b3b3b] font-thin border-[1px] border-black p-4 rounded-xl flex items-center space-x-2 w-[170px] justify-center'  ><FaPenToSquare className='h-[30px] w-[30px]'/><span>Tributes</span></li>
            <li onClick={()=>scrollhandler(details)} className='cursor-pointer text-3xl text-[#3b3b3b] font-thin border-[1px] border-black p-4 rounded-xl flex items-center space-x-2 w-[170px] justify-center'   ><TbListDetails className='h-[30px] w-[30px]'/><span>Details</span></li>
            </ul>
        </div>
        <div className='w-[800px] pb-4 text-xl flex flex-col space-y-8'>
            <Bio bio={bio}/>
            <Photos photos={photos} />
            <Tributes tribute={tribute}/>
            <Details details={details}/>
        </div>
       </div>
      </div>
      }
    </div>
  )
}

export default Userprofile
