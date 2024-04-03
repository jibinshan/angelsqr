import React, { useEffect } from 'react'
import Userprofile from './Userprofile'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getQrid, qrasync } from '../reduxtoolkit/Qrredux'
import { useMediaQuery } from 'react-responsive'
import Photos from './Photos'

function Bio({bio}) {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.Qr)
  const fetchData = async()=>{
      dispatch(qrasync())
  }
  useEffect(()=>{
     fetchData()
  },[])
  return (
    <div>
      {
        isTabletOrMobile ?
        <h1 className='w-full p-4 text-gray-700 text-lg font-thin'>{user?.rejistered?.bio}</h1>      
        :
        <h1 ref={bio} className='w-full pt-4 text-[#3b3b3b] text-[28px] font-[400] leading-normal whitespace-pre-wrap'>{user?.rejistered?.bio}</h1>      
      }
    </div>
  )
}

export default Bio
