import React, { forwardRef, useEffect, useState } from 'react'

const Componenttoprint = forwardRef(({item}, ref) => {
    const [qrimage,setQrimage] = useState(null)
    const isObject = typeof item === 'object' && !Array.isArray(item);
    const isArray = Array.isArray(item);
     useEffect(()=>{
        setQrimage(item)
     },[item])
     console.log(item,"===item");
  return (
    <div ref={ref} className='w-full h-screen p-20 flex-col border-4 border-black flex justify-center items-center'>
    
           
           
         {
           
         }
            <img src={item} alt="" />
           
       
    </div>
  );
});
Componenttoprint.displayName = 'ComponentToPrint';
export default Componenttoprint;
