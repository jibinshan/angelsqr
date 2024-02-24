import React, { useEffect, useState } from 'react'
import Adminpage from './Adminpage'
import axios from 'axios'


function GenerateQr() {
    const getqrapi = "http://localhost:1999/qrcodes/"
    const postqrapi = "http://localhost:1999/qrcodes/generateQr"
    const [qr,setQr] = useState([])
    const [number,setNumber] = useState('')
    const fetchdata = async()=>{
        try {
            const response = await axios(getqrapi)
            setQr(response.data) 
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
            console.log(response.data,"====sersdffsdf");
            setQr(response.data)
        
         } catch (error) {
             console.log(error);            
         }
    }
    console.log(qr,"====qr");
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
            <div className='w-full h-[450px] grid grid-cols-4 gap-4 gap-4 overflow-y-scroll p-2'>
                {
                    qr.map((qr)=>{
                        return(
                            <div key={qr._id} className='flex flex-col justify-center items-center h-[200px]'>
                                 <img className='w-[120px] h-[120px]' src={qr.qrImage && qr.qrImage } alt="Qr" />
                            </div>
                        )
                    })
                }
            </div>
           </div>
       </div>
   </Adminpage>
  )
}

export default GenerateQr
