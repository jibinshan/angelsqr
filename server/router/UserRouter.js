
const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserModel = require("../model/UserSchema"); 
const qr = require("../model/QrSchema")
const tribute = require("../model/TributeSchema")

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
    const profilePhoto = req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : '';
    const additionalPhotos = req.files['additionalPhotos'] ? req.files['additionalPhotos'].map(file => file.path) : [];
    const additionalVideos = req.files['additionalVideos'] ? req.files['additionalVideos'].map(file => file.path) : [];

    // Create a new user object
    const userdata = new UserModel({
      username,
      profilePhoto,
      dateOfBirth,
      dateOfDeath,
      about,
      bio,
      additionalPhotos,
      additionalVideos,
      cemeteryName,
      cemeteryPlotNumber,
      cemeteryLocation,
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
    const {comment,name} = req.body;
    const {userid} = req.params
    const avatar = req.files['avatar'] ? req.files['avatar'][0].path : '';
    const photos = req.files['photos'] ? req.files['photos'][0].path : '';
    console.log(userid,"=userid");
    const tributedata = new tribute({
     comment,
     name,
     avatar,
     photos
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
module.exports = router;
