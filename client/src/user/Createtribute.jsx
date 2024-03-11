import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Userprofile from './Userprofile';
import { CgProfile } from "react-icons/cg";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { ClipLoader } from 'react-spinners';

function Createtribute() {

  const [loading,setLoading] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const location = useLocation();
    const { userid } = location.state || {};
   
  const [tributeData, setTributeData] = useState({
    avatar:'',
    comment:'',
    name:'',
    photos:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTributeData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleprofileChange = (e)=>{
    setTributeData(prevState => ({
      ...prevState,
      avatar:e.target.files[0]
    }));
  }

  const handlePhotoChange = (e) => {
    setTributeData(prevState => ({
      ...prevState,
      photos: e.target.files[0],
    }));
  };

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const Formdata = new FormData()
    Formdata.append("name",tributeData.name)
    Formdata.append("photos",tributeData.photos)
    Formdata.append("avatar",tributeData.avatar)
    Formdata.append("comment",tributeData.comment)
    const api = `https://angelsqr-3.onrender.com/user/createtribute/${userid}`
    
    try {
        console.log(userid,"pouyss");
      const response = await axios(api,{
        method:"PUT",
        headers:{
          "Content-Type":"multipart/form-data",
        },
       
        data:Formdata
      })
      console.log(response);
    } catch (error) {
      console.log(error);
    }finally{
     setLoading(false)
    }
    
  };
  
 
 

  return (
    <Userprofile>
      {
        isTabletOrMobile
        ?
        <div className='flex flex-col gap-4 p-4 mt-[10px] items-center'>
        <p className='text-left text-blue-600 font-bold text-xl'>Fill out the fields below to leave memories, condolences, and/or photos.</p>
        <div className='flex flex-col gap-4 w-full'>
          <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
            <label className='text-black file-upload-label' htmlFor="profile-photo-upload">
              <span className="file-upload-icon flex items-center"><CgProfile className='h-[30px] w-[30px]'/></span>your Photo
            </label>
            <input id="profile-photo-upload" className='file-upload-input' type="file" onChange={handleprofileChange}/>
            {
              tributeData.avatar &&
              <div className='flex justify-center p-2'>
               <img src={URL.createObjectURL(tributeData.avatar)} alt="no image" className=' w-[150px] h-[150px] rounded-[50%]'/>
               </div>
            }
          </div>
          
          <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' placeholder='Your Name' type="text" name="name" onChange={handleChange}/>
          
         
          <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' placeholder='Write Your Tribute Here' name="comment" onChange={handleChange}></textarea>
          
           <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
            <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
              <span className="file-upload-icon flex items-center">< MdOutlinePhotoSizeSelectActual className='h-[30px] w-[30px]'/></span>
              Add Photo
            </label>
            <input id="additional-photos-upload" className='file-upload-input' type="file" onChange={handlePhotoChange}/>
            {
              tributeData.photos &&
              <div className='flex justify-center p-2'>
               <img src={URL.createObjectURL(tributeData.photos)} alt="no image" className='w-[150px] h-[150px]'/>
               </div>
            }
          </div>
          <button className='bg-blue-600 p-2 w-[200px] rounded-xl text-white hover:bg-blue-800' onClick={handleSubmit}>{loading ? <ClipLoader color='#36D7B7' loading={loading} size={15} /> : "Submit"}</button>
        </div>
      </div>
        :
        <div className='flex flex-col gap-4 p-4 mt-[50px] items-center'>
          <p className='text-left text-blue-600 font-bold text-xl w-[500px]'>Fill out the fields below to leave memories, condolences, and/or photos.</p>
          <div className='flex flex-col gap-4 w-[500px]'>
            <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="profile-photo-upload">
                <span className="file-upload-icon flex items-center"><CgProfile className='h-[30px] w-[30px]'/></span>your Photo
              </label>
              <input id="profile-photo-upload" className='file-upload-input' type="file" onChange={handleprofileChange}/>
              {
                tributeData.avatar &&
                <div className='flex justify-center p-2'>
                 <img src={URL.createObjectURL(tributeData.avatar)} alt="no image" className=' w-[150px] h-[150px] rounded-[50%]'/>
                 </div>
              }
            </div>
            
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' placeholder='Your Name' type="text" name="name" onChange={handleChange}/>
            
           
            <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' placeholder='Write Your Tribute Here' name="comment" onChange={handleChange}></textarea>
            
             <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
                <span className="file-upload-icon flex items-center">< MdOutlinePhotoSizeSelectActual className='h-[30px] w-[30px]'/></span>
                Add Photo
              </label>
              <input id="additional-photos-upload" className='file-upload-input' type="file" onChange={handlePhotoChange}/>
              {
                tributeData.photos &&
                <div className='flex justify-center p-2'>
                 <img src={URL.createObjectURL(tributeData.photos)} alt="no image" className='w-[150px] h-[150px]'/>
                 </div>
              }
            </div>
            <button className='bg-blue-600 p-2 w-[200px] rounded-xl text-white hover:bg-blue-800' onClick={handleSubmit}>{loading ? <ClipLoader color='#36D7B7' loading={loading} size={15} /> : "Submit"}</button>
          </div>
        </div>
      }
    </Userprofile>
  )
}

export default Createtribute
