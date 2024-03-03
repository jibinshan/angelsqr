import React, { useEffect, useState } from 'react'
import Adminpage from './Adminpage'
import axios from 'axios'

//http://localhost:1999
function GenerateQr() {
    const getqrapi = "https://angelsqr-3.onrender.com/qrcodes/"
    const postqrapi = "https://angelsqr-3.onrender.com/qrcodes/generateQr"
    const [registeredqr,setRegisteredQr] =useState([])
    const [notregisteredqr,setNotregisteredQr] =useState([])
    const [newqr,setNewqr] = useState([])
    const [number,setNumber] = useState('')
    const fetchdata = async()=>{
        try {
            const response = await axios(getqrapi)
            const registeredqr = await response.data.filter((qr)=>{
              return qr.user
            })
            setRegisteredQr(registeredqr)
            const notregisteredqr = await response.data.filter((qr)=>{
              return !qr.user
            })
            setNotregisteredQr(notregisteredqr)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
      fetchdata()
    },[])
    const numberchange = (e)=>{
           setNumber(e.target.value)
    }
    const numberclick = async()=>{
         try {
            const response = await axios(postqrapi,{
                method:"POST",
               data:{
                   numberofqr:number
               }
            })
            setNewqr(response.data)
        
         } catch (error) {
             console.log(error);            
         }
    }

  return (
   <Adminpage>
       <div className='ml-[250px] w-5/6 mt-[70px] h-[89vh] absolute flex justify-center items-center'>
           <div className='w-[93%] h-[81vh] bg-slate-900 rounded-xl'>
            <div className='w-full flex flex-col h-[110px] justify-center items-center gap-[10px]'>
             <h1 className='font-bold text-lg'>Enter The Number Of Qr Codes To Generate</h1>
                <div className='flex'>
                <input
                 type="text" 
                 placeholder='10'
                 className='p-2 border-none outline-none text-black' 
                 onChange={numberchange}
                 />
                 <button className='p-2 bg-blue-600 hover:bg-blue-400' onClick={numberclick}>Submit</button>
                </div>
            </div>
          
            <div className='w-full h-[450px]  overflow-y-scroll p-2 flex flex-col gap-4'>
          {newqr.length > 0 &&
          <div className='flex flex-col gap-2'>
         <div className='flex gap-4 items-center'>
          <h1 className='pl-2 font-bold text-xl'>New Qr Codes </h1>
          <button className='p-2 text-md border-[1px] hover:bg-slate-700 '>Download All</button>  
            </div> 
          <table className="w-[100%] border">
        <thead>
          <tr>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">SI.No.</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">QrId</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">Registered</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">Download</td>
          </tr>
        </thead>
        <tbody>
        {
  newqr.map((newItem, index) => {
    return(
      <tr key={newItem._id}>
        <td key={`col1-${index}`} className="border-b px-4 py-2">{index+1}</td>
        <td key={`col2-${index}`} className="border-b px-4 py-2 truncate">{newItem.qrId}</td>
        <td key={`col3-${index}`} className="border-b px-4 py-2">{newItem?.user ? "registered" : "not Registered"}</td>
        <td key={`col4-${index}`} className="border-b px-4 py-2"><button>Download</button></td>
      </tr>
    );
  })
}
        </tbody>
      </table>
      </div>
      }
    {registeredqr.length > 0 &&
          <div className='flex flex-col gap-2 '>
         <div className='flex gap-4 items-center'>
          <h1 className='pl-2 font-bold text-xl'>Registered Qr Codes </h1>
          <button className='p-2 text-md border-[1px] hover:bg-slate-700 '>Download All</button>  
            </div> 
          <table className="w-[100%] border">
        <thead>
          <tr>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">SI.No.</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">QrId</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">Registered</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">Download</td>
          </tr>
        </thead>
        <tbody>
        {
  registeredqr.map((newItem, index) => {
    return(
      <tr key={newItem._id}>
        <td key={`col1-${index}`} className="border-b px-4 py-2">{index+1}</td>
        <td key={`col2-${index}`} className="border-b px-4 py-2 truncate">{newItem.qrId}</td>
        <td key={`col3-${index}`} className="border-b px-4 py-2">{newItem?.user ? "registered" : "not Registered"}</td>
        <td key={`col4-${index}`} className="border-b px-4 py-2"><button>Download</button></td>
      </tr>
    );
  })
}
        </tbody>
      </table>
      </div>
      }
         {notregisteredqr.length > 0 &&
          <div className='flex flex-col gap-2 '>
            <div className='flex gap-4 items-center'>
          <h1 className='pl-2 font-bold text-xl'>NotRegistered Qr Codes </h1>
          <button className='p-2 text-md border-[1px] hover:bg-slate-700 '>Download All</button>  
            </div>
          <table className="w-[100%] border">
        <thead>
          <tr>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">SI.No.</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">QrId</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">Registered</td>
            <td className="border-b px-4 py-2 bg-slate-400 text-black">Download</td>
          </tr>
        </thead>
        <tbody>
        {
  notregisteredqr.map((newItem, index) => {
    return(
      <tr key={newItem._id}>
        <td key={`col1-${index}`} className="border-b px-4 py-2">{index+1}</td>
        <td key={`col2-${index}`} className="border-b px-4 py-2 truncate">{newItem.qrId}</td>
        <td key={`col3-${index}`} className="border-b px-4 py-2">{newItem?.user ? "registered" : "not Registered"}</td>
        <td key={`col4-${index}`} className="border-b px-4 py-2"><button>Download</button></td>
      </tr>
    );
  })
}
        </tbody>
      </table>
      </div>
      }
           </div>
            </div>
           </div>
     
   </Adminpage>
  )
}

export default GenerateQr
