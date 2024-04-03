import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useMediaQuery } from 'react-responsive'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { CgProfile } from "react-icons/cg";
import { IoMdPhotos } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { ClipLoader } from 'react-spinners';
import { FaImage } from "react-icons/fa";

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
    coverImage:'',
    additionalPhotos: [],
    additionalVideos: [],
    cemeteryName: '',
    cemeteryPlotNumber: '',
    cemeteryLocation: '',
    Vadditionaldetails:'',
    Vdate:'',
    Vstarttime:'',
    Vendtime:'',
    Vlocation:'',
    Fsadditionaldetails:'',
    Fsdate:'',
    Fsstarttime:'',
    Fsendtime:'',
    Fslocation:'',
  });
  console.log(profileData,"===prodata");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handledobChange = (e)=>{
    const dateValue = e.target.value;
    const dateObject = new Date(dateValue);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const userFriendlyDate = dateObject.toLocaleDateString('en-US', options);

    setProfileData((prev)=>({
      ...prev,
      dateOfBirth:userFriendlyDate
    }))
  }
  const handledodChange = (e)=>{
    const dateValue = e.target.value;
    const dateObject = new Date(dateValue);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const userFriendlyDate = dateObject.toLocaleDateString('en-US', options);

    setProfileData((prev)=>({
      ...prev,
      dateOfDeath:userFriendlyDate
    }))
  }
  const handleprofileChange = (e)=>{
    setProfileData(prevState => ({
      ...prevState,
      profilePhoto:e.target.files[0]
    }));
  }

  const handlecoverChange = (e)=>{
    setProfileData(prevState => ({
      ...prevState,
      coverImage:e.target.files[0]
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
const handlevdateChange = (e)=>{
  const dateValue = e.target.value;
  const dateObject = new Date(dateValue);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const userFriendlyDate = dateObject.toLocaleDateString('en-US', options);

  setProfileData((prev)=>({
    ...prev,
    Vdate:userFriendlyDate
  }))
}
const handlefsdateChange = (e)=>{
  const dateValue = e.target.value;
  const dateObject = new Date(dateValue);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const userFriendlyDate = dateObject.toLocaleDateString('en-US', options);

  setProfileData((prev)=>({
    ...prev,
    Fsdate:userFriendlyDate
  }))
}
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(qrid,"===qrid");
    setLoading(true)
    const Formdata = new FormData()
    Formdata.append("username",profileData.username)
    Formdata.append("profilePhoto",profileData.profilePhoto)
    Formdata.append("coverImage",profileData.coverImage)
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

    Formdata.append("Vadditionaldetails",profileData.Vadditionaldetails)
    Formdata.append("Vdate",profileData.Vdate)
    Formdata.append("Vstarttime",profileData.Vstarttime)
    Formdata.append("Vendtime",profileData.Vendtime)
    Formdata.append("Vlocation",profileData.Vlocation)
    Formdata.append("Fsadditionaldetails",profileData.Fsadditionaldetails)
    Formdata.append("Fsdate",profileData.Fsdate)
    Formdata.append("Fsstarttime",profileData.Fsstarttime)
    Formdata.append("Fsendtime",profileData.Fsendtime)
    Formdata.append("Fslocation",profileData.Fslocation)

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
      navigate(`/userprofile/${qrid}`)
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
          <p className='text-left text-stone-700 text-[25px] font-[200] leading-normal'>Create a memorial page in a few easy steps. Enter details for your loved one below to get started.</p>
          <div className='flex flex-col gap-4'>
          <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
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

            <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="cover-photo-upload">
                <span className="file-upload-icon flex items-center"><FaImage className='h-[30px] w-[30px]'/></span> Cover Image
              </label>
              <input id="cover-photo-upload" className='file-upload-input' type="file" onChange={handlecoverChange}/>
              {
                profileData.coverImage &&
                <div className='flex justify-center p-2'>
                  <img src={URL.createObjectURL(profileData.coverImage)} alt="no image" className=' w-[150px] h-[100px]'/>
                </div>
               
              }
            </div>
            <div className='flex flex-col'>
            <label htmlFor="" className='text-lg'>Full Name</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="username" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Birth</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="date"  name="dateOfBirth" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Death</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="date" name="dateOfDeath" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">About (one sentence)</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="about" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Bio</label>
            <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' name="bio" onChange={handleChange}></textarea>
            </div>
            <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
                <span className="file-upload-icon flex items-center"><IoMdPhotos className='h-[30px] w-[30px]'/></span>
                Add Photos
              </label>
              <input id="additional-photos-upload" className='file-upload-input' type="file" multiple onChange={handlePhotoChange}/>
              {
              profileData.additionalPhotos.length > 0 &&
              <div className='grid grid-cols-3 gap-2 pt-2 pb-2 p-2'>
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
            <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="single-video-upload">
                <span className="file-upload-icon flex items-center"><BiSolidVideos className='h-[30px] w-[30px]'/></span>
                Add Videos
              </label>
              <input id="single-video-upload" className='file-upload-input' type="file" multiple onChange={handleVideoChange}/>
            {
              profileData.additionalVideos.length > 0 &&
              <div className='grid grid-cols-3 gap-2 pt-2 pb-2 p-2'>
              {
              profileData.additionalVideos.map((videos)=>{
                return(
                  <div key={videos.lastModified}>
                    <div className='w-[100px] text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletevideo(videos.lastModified)}>
                       <MdDelete />
                    </div>
                    <video className='w-[100px] h-[100px]' src={URL.createObjectURL(videos)}></video>
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
          <p className='text-left text-stone-600 text-[30px] font-[200] leading-normal'>Create a memorial page in a few easy steps. Enter details for your loved one below to get started.</p>
          <div className='flex flex-col gap-4 w-[500px] '>
            <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
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
            <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="cover-photo-upload">
                <span className="file-upload-icon flex items-center"><FaImage className='h-[30px] w-[30px]'/></span> Cover Image
              </label>
              <input id="cover-photo-upload" className='file-upload-input' type="file" onChange={handlecoverChange}/>
              {
                profileData.coverImage &&
                <div className='flex justify-center p-2'>
                  <img src={URL.createObjectURL(profileData.coverImage)} alt="no image" className=' w-[150px] h-[100px]'/>
                </div>
               
              }
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Full Name</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="username" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Birth</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="date"  name="dateOfBirth" onChange={handledobChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Date Of Death</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="date" name="dateOfDeath" onChange={handledodChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Place of residence</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="about" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Obituary</label>
            <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' name="bio" onChange={handleChange}></textarea>
            </div>
            <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="additional-photos-upload">
                <span className="file-upload-icon flex items-center"><IoMdPhotos className='h-[30px] w-[30px]'/></span>
                Add Photos
              </label>
              <input id="additional-photos-upload" className='file-upload-input' type="file" multiple onChange={handlePhotoChange}/>
              {
              profileData.additionalPhotos.length > 0 &&
              <div className='grid grid-cols-3 gap-2 pt-2 pb-2 p-2'>
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
            <div className='w-fit flex flex-col bg-stone-200 rounded-2xl'>
              <label className='text-black file-upload-label' htmlFor="single-video-upload">
                <span className="file-upload-icon flex items-center"><BiSolidVideos className='h-[30px] w-[30px]'/></span>
                Add Videos
              </label>
              <input id="single-video-upload" className='file-upload-input' type="file" multiple onChange={handleVideoChange}/>
            {
              profileData.additionalVideos.length > 0 &&
              <div className='grid grid-cols-3 gap-2 pt-2 pb-2 p-2'>
              {
              profileData.additionalVideos.map((videos)=>{
                return(
                  <div key={videos.lastModified}>
                    <div className='w-[100px] text-black rounded-t-md bg-blue-600 hover:bg-red-600 flex justify-center p-[1px]' onClick={()=>handledeletevideo(videos.lastModified)}>
                       <MdDelete />
                    </div>
                    <video className='w-[100px] h-[100px]' src={URL.createObjectURL(videos)}></video>
                  </div>
                    )
                  })
                }
                </div>
            }
            </div>
  
           <div className='flex flex-col gap-4'>
            <h4 className='font-[600] text-2xl'>Visitation</h4>
            <div className='flex flex-col'>
            <label htmlFor="">Date</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]'  type="date" name="Vdate" onChange={handlevdateChange}/>
            </div>
            <div className='w-full flex space-x-4'>
            <div className='flex flex-col w-[50%]'>
            <label htmlFor="">Start Time</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="time" name="Vstarttime" onChange={handleChange}/>
            </div>
            <div className='flex flex-col w-[50%]'>
            <label htmlFor="">End Time</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="time" name="Vendtime" onChange={handleChange}/>
            </div>
            </div>
           <div className='flex flex-col'>
            <label htmlFor="">Location</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="Vlocation" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Additional Details</label>
            <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' name="Vadditionaldetails" onChange={handleChange}></textarea>
            </div>
           </div>
          
           <div className='flex flex-col gap-4'>
            <h4 className='font-[600] text-2xl'>Funeral service</h4>
            <div className='flex flex-col'>
            <label htmlFor="">Date</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="date" name="Fsdate" onChange={handlefsdateChange}/>
            </div>
            <div className='w-full flex space-x-4'>
            <div className='flex flex-col w-[50%]'>
            <label htmlFor="">Start Time</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="time" name="Fsstarttime" onChange={handleChange}/>
            </div>
            <div className='flex flex-col w-[50%]'>
            <label htmlFor="">End Time</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="time" name="Fsendtime" onChange={handleChange}/>
            </div>
            </div>
           <div className='flex flex-col'>
            <label htmlFor="">Location</label>
            <input className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px]' type="text" name="Fslocation" onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Additional Details</label>
            <textarea className='p-4 pl-2 text-black rounded-lg border-gray-400 border-[1px] h-[150px]' name="Fsadditionaldetails" onChange={handleChange}></textarea>
            </div>
           </div>
            <button className='bg-stone-700 p-4 rounded-lg text-white hover:bg-stone-900' onClick={handleSubmit}>{loading ? <ClipLoader color='#36D7B7' loading={loading} size={15} /> : "Submit"}</button>
          </div>
        </div>
      }
    </div>
  )
}

export default CreateUser
