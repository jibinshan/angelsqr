import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useMediaQuery } from 'react-responsive'
import axios from 'axios';
import {  useNavigate,useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { CgProfile } from "react-icons/cg";
import { IoMdPhotos } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { ClipLoader } from 'react-spinners';

function CreateUser() {
  let { qrid } = useParams();
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
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
    setLoading(true)
    const Formdata = new FormData()
    Formdata.append("username",profileData.username)
    Formdata.append("profilePhoto",profileData.profilePhoto)
    profileData.additionalPhotos.forEach((photo) => {
      Formdata.append("additionalPhotos", photo);
    });
    profileData.additionalVideos.forEach((video) => {
      Formdata.append("additionalVideos", video);
    });
    Formdata.append("qrid",qrid)
    Formdata.append("dateOfDeath",profileData.dateOfDeath)
    Formdata.append("dateOfBirth",profileData.dateOfBirth)
    Formdata.append("about",profileData.about)
    Formdata.append("bio",profileData.bio)
    Formdata.append("cemeteryName",profileData.cemeteryName)
    Formdata.append("cemeteryPlotNumber",profileData.cemeteryPlotNumber)
    Formdata.append("cemeteryLocation",profileData.cemeteryLocation)
    const api = 'https://angelsqr-3.onrender.com/user/createUser'
    try {
      const response = await axios(api,{
        method:"PUT",
        headers:{
          "Content-Type":"multipart/form-data",
        },
       
        data:Formdata
      })
      console.log(response);
       navigate(`/bio/${qrid}`)
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
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
    <div className='w-full flex flex-col justify-center items-center pb-6'>
      <Navbar/>
      {
        isTabletOrMobile
        ?
        <div className='flex flex-col gap-4 w-full p-4'>
          <p className='text-left text-blue-600 font-bold text-lg'>Create a memorial page in a few easy steps. Enter details for your loved one below to get started.</p>
          <div className='flex flex-col gap-4'>
          <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="profile-photo-upload">
                <span className="file-upload-icon flex items-center"><CgProfile className='h-[30px] w-[30px]'/></span> Profile Photo
              </label>
              <input id="profile-photo-upload" className='file-upload-input' type="file" onChange={handleprofileChange}/>
              {
                profileData.profilePhoto &&
                <div className='flex justify-center p-2'>
                  <img src={URL.createObjectURL(profileData.profilePhoto)} alt="no image" className=' w-[150px] h-[150px] rounded-[50%]'/>
                </div>
               
              }
            </div>
            <div className='flex flex-col'>
            <label htmlFor="" className='text-lg'>Full Name</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="username" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Birth</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text"  name="dateOfBirth" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Death</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="dateOfDeath" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">About (one sentence)</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="about" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Bio</label>
            <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' name="bio" onChange={handleChange}></textarea>
            </div>
            <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
                <span className="file-upload-icon flex items-center"><IoMdPhotos className='h-[30px] w-[30px]'/></span>
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
                    <div className='w-[100px] text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletephotos(photos.lastModified)}>
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
            <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="single-video-upload">
                <span className="file-upload-icon flex items-center"><BiSolidVideos className='h-[30px] w-[30px]'/></span>
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
                    <div className='w-[100px] text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletevideo(videos.lastModified)}>
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
            <div className='flex flex-col'>
            <label htmlFor="">Cemetery Name</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="cemeteryName" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Cemetery Plot Number</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="cemeteryPlotNumber" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Cemetery Location</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="cemeteryLocation" onChange={handleChange}/>
            </div>
            <button className='bg-blue-600 p-4 rounded-lg text-white hover:bg-blue-800' onClick={handleSubmit}> {loading ? <ClipLoader color='#36D7B7' loading={loading} size={15} /> : "Submit"}</button>
          </div>
        </div>
        :
        
        <div className='flex flex-col gap-4  p-4 w-[700px] mt-[50px]'>
          <p className='text-left text-blue-600 font-bold text-3xl '>Create a memorial page in a few easy steps. Enter details for your loved one below to get started.</p>
          <div className='flex flex-col gap-4 w-[500px] '>
            <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="profile-photo-upload">
                <span className="file-upload-icon flex items-center"><CgProfile className='h-[30px] w-[30px]'/></span> Profile Photo
              </label>
              <input id="profile-photo-upload" className='file-upload-input' type="file" onChange={handleprofileChange}/>
              {
                profileData.profilePhoto &&
                <div className='flex justify-center p-2'>
                  <img src={URL.createObjectURL(profileData.profilePhoto)} alt="no image" className=' w-[150px] h-[150px] rounded-[50%]'/>
                </div>
               
              }
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Full Name</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="username" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Birth</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text"  name="dateOfBirth" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Death</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="dateOfDeath" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">About (one sentence)</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="about" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Bio</label>
            <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' name="bio" onChange={handleChange}></textarea>
            </div>
            <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
                <span className="file-upload-icon flex items-center"><IoMdPhotos className='h-[30px] w-[30px]'/></span>
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
                    <div className='w-[100px] text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletephotos(photos.lastModified)}>
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
            <div className='w-fit flex flex-col bg-slate-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="single-video-upload">
                <span className="file-upload-icon flex items-center"><BiSolidVideos className='h-[30px] w-[30px]'/></span>
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
                    <div className='w-[100px] text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletevideo(videos.lastModified)}>
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
            <div className='flex flex-col'>
            <label htmlFor="">Cemetery Name</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="cemeteryName" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Cemetery Plot Number</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="cemeteryPlotNumber" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Cemetery Location</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="cemeteryLocation" onChange={handleChange}/>
            </div>
            <button className='bg-blue-600 p-4 rounded-lg text-white hover:bg-blue-800' onClick={handleSubmit}>{loading ? <ClipLoader color='#36D7B7' loading={loading} size={15} /> : "Submit"}</button>
          </div>
        </div>
      }
    </div>
  )
}

export default CreateUser
