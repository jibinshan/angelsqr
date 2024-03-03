const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserModel = require("../model/UserSchema");

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
router.post("/createUser", upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'additionalPhotos', maxCount: 100 },
  { name: 'additionalVideos', maxCount: 100}
]), async (req, res) => {
  try {
    // Extract data from the request body
    const {
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
    const profilePhoto = req.files['profilePhoto'][0].path;
    const additionalPhotos = req.files['additionalPhotos'] ? req.files['additionalPhotos'].map(file => file.path) : [];
    const additionalVideos = req.files['additionalVideos'] ? req.files['additionalVideos'].map(file => file.path) : [];

    // Create a new user object
   const userdata = await UserModel.create({
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

    // Send a success response
    return res.status(200).json( userdata);
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    console.log(error.message);
    return res.status(400).json( "Internal server error" );
  }
});

module.exports = router;
