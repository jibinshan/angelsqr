import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { MdDelete } from "react-icons/md";
import axios from 'axios';

function CreateUser() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [profileData, setProfileData] = useState({
    profilePhoto: '',
    username: '',
    dateOfBirth: '',
    dateOfDeath: '',
    about: '',
    bio: '',
    additionalPhotos: [],
    additionalVideos: [],
    cemeteryName: '',
    cemeteryPlotNumber: '',
    cemeteryLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleprofileChange = (e)=>{
    setProfileData(prevState => ({
      ...prevState,
      profilePhoto:e.target.files[0]
    }));
  }

  const handlePhotoChange = (e) => {
    const photos = Array.from(e.target.files);
    setProfileData(prevState => ({
      ...prevState,
      additionalPhotos: [...prevState.additionalPhotos, ...photos],
    }));
  };

  const handleVideoChange = (e) => {
    const videos = Array.from(e.target.files);
    setProfileData(prevState => ({
      ...prevState,
      additionalVideos: [...prevState.additionalVideos, ...videos],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const Formdata = new FormData()
    Formdata.append("username",profileData.username)
    Formdata.append("profilePhoto",profileData.profilePhoto)
    profileData.additionalPhotos.forEach((photo) => {
      Formdata.append("additionalPhotos", photo);
    });
    profileData.additionalVideos.forEach((video) => {
      Formdata.append("additionalVideos", video);
    });
    Formdata.append("dateOfDeath",profileData.dateOfDeath)
    Formdata.append("dateOfBirth",profileData.dateOfBirth)
    Formdata.append("about",profileData.about)
    Formdata.append("bio",profileData.bio)
    Formdata.append("cemeteryName",profileData.cemeteryName)
    Formdata.append("cemeteryPlotNumber",profileData.cemeteryPlotNumber)
    Formdata.append("cemeteryLocation",profileData.cemeteryLocation)
    const api = "https://angelsqr-3.onrender.com/user/createUser"
    try {
      const response = await axios(api,{
        method:"POST",
        headers:{
          "Content-Type":"multipart/form-data",
        },
       
        data:Formdata
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    
  };
  
  const handledeletevideo = (id)=>{
       const deletevideo = profileData.additionalVideos.filter((video)=>video.lastModified !== id)
       setProfileData(prevState => ({
        ...prevState,
        additionalVideos: deletevideo,
      }));
  }
  const handledeletephotos = (id)=>{
    const deletephoto = profileData.additionalPhotos.filter((photo)=>photo.lastModified !== id)
    setProfileData(prevState => ({
     ...prevState,
     additionalPhotos: deletephoto,
   }));
  }

  return (
    <div className='w-full flex justify-center items-center pb-6'>
      {
        isTabletOrMobile
        ?
        <div className='flex flex-col gap-4 p-4 mt-[50px] bg-white rounded-lg shadow-lg w-10/12'>
          <p className='text-center text-blue-600 font-bold text-lg'>Create Profile</p>
          <div className='flex flex-col gap-2'>
            <div className='w-full flex flex-col bg-slate-200 p-2 rounded'>
              <label className='text-black file-upload-label' htmlFor="profile-photo-upload">
                <span className="file-upload-icon">+</span>Profile Photo
              </label>
              <input id="profile-photo-upload" className='file-upload-input' type="file" onChange={handleprofileChange}/>
              {
                profileData.profilePhoto &&
                
                 <img src={URL.createObjectURL(profileData.profilePhoto)} alt="no image" className='ml-[50px] w-[150px] rounded-[50%]'/>
               
              }
            </div>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Username' name="username" onChange={handleChange}/>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Date of birth' name="dateOfBirth" onChange={handleChange}/>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Date of death' name="dateOfDeath" onChange={handleChange}/>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='About' name="about" onChange={handleChange}/>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Bio' name="bio" onChange={handleChange}/>
            <div className='w-full flex flex-col bg-slate-200 p-2 rounded'>
              <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
                <span className="file-upload-icon">+</span>
                Add Photos
              </label>
              <input id="additional-photos-upload" className='file-upload-input' type="file" multiple onChange={handlePhotoChange}/>
              {
              profileData.additionalPhotos.length > 0 &&
              <div className='grid grid-cols-3 gap-2 pt-2 pb-2'>
              {
              profileData.additionalPhotos.map((photos)=>{
                return(
                  <div key={photos.lastModified}>
                    <div className='text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletephotos(photos.lastModified)}>
                       <MdDelete />
                    </div>
                    <img  className='w-[100px] h-[100px]' src={URL.createObjectURL(photos)}  alt="no image"/>
                  </div>
                    )
                  })
                }
                </div>
            }
            </div>
            <div className='w-full flex flex-col bg-slate-200 p-2 rounded'>
              <label className='text-black file-upload-label' htmlFor="single-video-upload">
                <span className="file-upload-icon">+</span>
                Add Videos
              </label>
              <input id="single-video-upload" className='file-upload-input' type="file" multiple onChange={handleVideoChange}/>
            {
              profileData.additionalVideos.length > 0 &&
              <div className='grid grid-cols-3 gap-2 pt-2 pb-2'>
              {
              profileData.additionalVideos.map((videos)=>{
                return(
                  <div key={videos.lastModified}>
                    <div className='text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletevideo(videos.lastModified)}>
                       <MdDelete />
                    </div>
                    <img  className='w-[100px] h-[100px]' src={URL.createObjectURL(videos)}  alt="no image"/>
                  </div>
                    )
                  })
                }
                </div>
            }
            </div>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Cemetery Name' name="cemeteryName" onChange={handleChange}/>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Cemetery Plot Number' name="cemeteryPlotNumber" onChange={handleChange}/>
            <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Cemetery Location' name="cemeteryLocation" onChange={handleChange}/>
            <button className='bg-blue-600 p-2' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        :
        <div className='flex flex-col gap-4 p-4 mt-[50px] bg-white rounded-lg shadow-lg w-3/12'>
        <p className='text-center text-blue-600 font-bold text-lg'>Create Profile</p>
        <div className='flex flex-col gap-2'>
          <div className='w-full flex flex-col bg-slate-200 p-2 rounded'>
            <label className='text-black file-upload-label' htmlFor="profile-photo-upload">
              <span className="file-upload-icon">+</span>Profile Photo
            </label>
            <input id="profile-photo-upload" className='file-upload-input' type="file" onChange={handleprofileChange}/>
            {
              profileData.profilePhoto &&
              
               <img src={URL.createObjectURL(profileData.profilePhoto)} alt="no image" className='ml-[50px] w-[150px] rounded-[50%]'/>
             
            }
          </div>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Username' name="username" onChange={handleChange}/>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Date of birth' name="dateOfBirth" onChange={handleChange}/>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Date of death' name="dateOfDeath" onChange={handleChange}/>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='About' name="about" onChange={handleChange}/>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Bio' name="bio" onChange={handleChange}/>
          <div className='w-full flex flex-col bg-slate-200 p-2 rounded'>
            <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
              <span className="file-upload-icon">+</span>
              Add Photos
            </label>
            <input id="additional-photos-upload" className='file-upload-input' type="file" multiple onChange={handlePhotoChange}/>
            {
            profileData.additionalPhotos.length > 0 &&
            <div className='grid grid-cols-3 gap-2 pt-2 pb-2'>
            {
            profileData.additionalPhotos.map((photos)=>{
              return(
                <div key={photos.lastModified}>
                  <div className='text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletephotos(photos.lastModified)}>
                     <MdDelete />
                  </div>
                  <img  className='w-[100px] h-[100px]' src={URL.createObjectURL(photos)}  alt="no image"/>
                </div>
                  )
                })
              }
              </div>
          }
          </div>
          <div className='w-full flex flex-col bg-slate-200 p-2 rounded'>
            <label className='text-black file-upload-label' htmlFor="single-video-upload">
              <span className="file-upload-icon">+</span>
              Add Videos
            </label>
            <input id="single-video-upload" className='file-upload-input' type="file" multiple onChange={handleVideoChange}/>
          {
            profileData.additionalVideos.length > 0 &&
            <div className='grid grid-cols-3 gap-2 pt-2 pb-2'>
            {
            profileData.additionalVideos.map((videos)=>{
              return(
                <div key={videos.lastModified}>
                  <div className='text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletevideo(videos.lastModified)}>
                     <MdDelete />
                  </div>
                  <img  className='w-[100px] h-[100px]' src={URL.createObjectURL(videos)}  alt="no image"/>
                </div>
                  )
                })
              }
              </div>
          }
          </div>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Cemetery Name' name="cemeteryName" onChange={handleChange}/>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Cemetery Plot Number' name="cemeteryPlotNumber" onChange={handleChange}/>
          <input className='bg-slate-200 p-[3px] pl-2 outline-none text-black' type="text" placeholder='Cemetery Location' name="cemeteryLocation" onChange={handleChange}/>
          <button className='bg-blue-600 p-2' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      }
    </div>
  )
}

export default CreateUser
