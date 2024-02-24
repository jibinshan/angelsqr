import React from 'react'
import Adminpage from './Adminpage'
import { FaRegUser } from "react-icons/fa";

function Users() {
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
          <tr>
            <td className="border-b px-4 py-2">Data 1</td>
            <td className="border-b px-4 py-2">Data 2</td>
            <td className="border-b px-4 py-2">Data 3</td>
          </tr>
        </tbody>
      </table>
           </div>
       </div>
    </Adminpage>
  )
}

export default Users
