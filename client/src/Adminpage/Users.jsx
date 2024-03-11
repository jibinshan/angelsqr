import React, { useEffect, useState } from 'react'
import Adminpage from './Adminpage'
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';

function Users() {
  const [users,setUsers] = useState([])
  const api = "https://angelsqr-3.onrender.com/user/getusers"
  const fetchdata = async()=>{
    try {
      const response = await axios(api)
      setUsers(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
     fetchdata()
  },[])
  return (
    <Adminpage>
         <div className='ml-[250px] w-5/6 mt-[70px] h-[89vh] absolute flex justify-center items-center'>
           <div className='w-[93%] h-[81vh] bg-slate-900 rounded-xl p-12'>
           <table className="w-[100%] border">
        <thead>
          <tr>
            <td className="border-b px-4 py-2 bg-slate-400 text-black"><FaRegUser/></td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">User</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">Registered</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index)=>{
            return(
          <tr key={user._id}>
            <td className="border-b px-4 py-2">{index+1}</td>
            <td className="border-b px-4 py-2">{user.username}</td>
            <td className="border-b px-4 py-2">registered</td>
          </tr>

            )
          })}
        </tbody>
      </table>
           </div>
       </div>
    </Adminpage>
  )
}

export default Users
