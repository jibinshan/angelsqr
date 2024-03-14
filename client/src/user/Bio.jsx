import React, { useEffect } from 'react'
import Userprofile from './Userprofile'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getQrid, qrasync } from '../reduxtoolkit/Qrredux'
import { useMediaQuery } from 'react-responsive'

function Bio() {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {qrid} = useParams()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.Qr)
  dispatch(getQrid(qrid))
  const fetchData = async()=>{
      dispatch(qrasync())
  }
  useEffect(()=>{
     fetchData()
  },[])
  return (
    <Userprofile>
      {
        isTabletOrMobile ?
        <h1 className='w-full p-4 text-gray-700 text-lg font-bold'>{user?.rejistered?.bio}</h1>      
        :
        <h1 className='w-full pt-4 text-gray-700 text-2xl font-bold'>{user?.rejistered?.bio}</h1>      
      }
      
    </Userprofile>
  )
}

export default Bio
