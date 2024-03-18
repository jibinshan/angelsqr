
const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserModel = require("../model/UserSchema"); 
const qr = require("../model/QrSchema")
const tribute = require("../model/TributeSchema")
const  S3 = require("aws-sdk/clients/s3");
const fs = require("fs")
require("dotenv").config()


const region = process.env.AWS_S3_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretkey = process.env.AWS_SECRET_ACCESS_KEY
const bucketname = process.env.AWS_S3_BUCKET

// process.env.AWS_ACCESS_KEY_ID,
const s3Client = new S3({
    region: region,  
    accessKeyId: accessKey,
    secretAccessKey: secretkey
});

// Multer configuration for handling file uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
})
  
  
  const upload = multer({ storage: storage });
  
  // Route for creating a new user
  router.put("/createUser", upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'additionalPhotos', maxCount: 100 },
  { name: 'additionalVideos', maxCount: 100}
]), async (req, res) => {
  try {
    // Extract data from the request body, including qrid
    const {
      qrid, // Extract qrid from the request body
      username,
      dateOfBirth,
      dateOfDeath,
      about,
      bio,
      cemeteryName,
      cemeteryPlotNumber,
      cemeteryLocation,
    } = req.body;

    // Extract file paths from the uploaded files
  console.log(req.files['profilePhoto'],"=====profile");
    const profilePhoto = req.files['profilePhoto'] ? req.files['profilePhoto'] : '';
    const coverImage = req.files['coverImage'] ? req.files['coverImage'] : '';
    const additionalPhotos = req.files['additionalPhotos'] ? req.files['additionalPhotos'].map(file => file) : [];
    const additionalVideos = req.files['additionalVideos'] ? req.files['additionalVideos'].map(file => file) : [];
    // Upload files to S3 concurrently
    const uploadPromises = [];
    if (profilePhoto) {
       console.log(profilePhoto,"===profilePhoto");
       uploadPromises.push(uploadToS3(profilePhoto[0],'profilePhoto'));
     }
     if (coverImage) {
       uploadPromises.push(uploadToS3(coverImage[0],'coverImage'));
     }
    
      
       additionalVideos.forEach(video => uploadPromises.push(uploadToS3(video,'additionalPhotos')));
    
     
      
       additionalPhotos.forEach(photo => uploadPromises.push(uploadToS3(photo,'additionalPhotos')));
     
 
     // Wait for all uploads to complete
     const uploadResults = await Promise.all(uploadPromises);
     console.log(uploadPromises,"===results");
 
     // Extract URLs from upload results
     const profilePhotoUrl = uploadResults.find(result => result.fieldname === 'profilePhoto');
     const coverImageUrl = uploadResults.find(result => result.fieldname === 'coverImage');
     const additionalPhotosUrls = uploadResults.filter(result => result.fieldname === 'additionalPhotos').map(result => result.Location);
     const additionalVideosUrls = uploadResults.filter(result => result.fieldname === 'additionalVideos').map(result => result.Location);
    // Create a new user object
    const userdata = new UserModel({
      username,
      profilePhoto: profilePhotoUrl ? profilePhotoUrl.Location : '',
      dateOfBirth,
      dateOfDeath,
      about,
      bio,
      additionalPhotos: additionalPhotosUrls,
      additionalVideos: additionalVideosUrls,
      cemeteryName,
      cemeteryPlotNumber,
      cemeteryLocation,
      coverImage: coverImageUrl ? coverImageUrl.Location : '',
    });  
    await userdata.save()   

    // Update the corresponding QR document with the newly created user's ID

    const updatedQR = await qr.findOneAndUpdate(
      {
        qrId: qrid, // Use the provided qrid
      },
      {
        $addToSet: {
          rejistered: userdata._id,
        },
      },
      { new: true }
    ).populate({
      path: "rejistered",
      model: "User"
    });

    console.log(updatedQR, "===updatedQR");
    
    return res.status(200).json(updatedQR);
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    console.log(error.message);
    return res.status(400).json("Internal server error");
  }
});
router.put("/createtribute/:userid", upload.fields([
  { name: 'avatar', maxCount: 1 },
{ name: 'photos', maxCount: 1 },
]),async(req,res)=>{
  try {
    const {comment,name,email} = req.body;
    const {userid} = req.params
    const avatar = req.files['avatar'] ? req.files['avatar'][0] : '';
    const photos = req.files['photos'] ? req.files['photos'][0] : '';

 // Upload files to S3 concurrently
 const uploadPromises = [];
 if (avatar) {
    uploadPromises.push(uploadToS3(avatar,'avatar'));
  }
  if (photos) {
    uploadPromises.push(uploadToS3(photos,'photos'));
  }
  const uploadResults = await Promise.all(uploadPromises);

    // Extract URLs from upload results
  const avatarurl = uploadResults.find(result => result.fieldname === 'avatar');
  const photosUrl = uploadResults.find(result => result.fieldname === 'photos');
    const tributedata = new tribute({
     comment,
     name,
     avatar : avatarurl ? avatarurl.Location : '',
     email,
     photos : photosUrl ? photosUrl.Location : '',
    });
    await tributedata.save()
    const updateuser = await UserModel.findOneAndUpdate(
      {
        _id: userid, 
      },
      {
        $push: {         
            tribute : tributedata._id,
        },
      },
      { new: true }
    )
    return res.status(200).json(updateuser);
  } catch (error) {
      return res.status(400).json(error)
  }
})
router.get("/getusers",async(req,res)=>{
      try {
        const users = await UserModel.find()
        return res.status(200).json(users)
      } catch (error) {
        return res.status(400).json(error)
      }
})
async function uploadToS3(file,fieldname) {
  let files = file 
  const filestream  = fs.createReadStream(files.path)
  const uploadparams = {
    Bucket: bucketname,
    Key: `${Date.now()}-${files.originalname}`,
    Body: filestream,
    ACL: "public-read"
  };
  try {
    const response = await s3Client.upload(uploadparams).promise();
    console.log(response,"===response");
    const responses = {
      ...response,
      fieldname:fieldname
    }
    return responses;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

module.exports = router;
