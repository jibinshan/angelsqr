const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{ 
        type: String, 
        required: true 
    },
    profilePhoto: { 
        type: String,
        required: true 
    },
    dateOfBirth:{
        type: String,
        required: true 
    },
    dateOfDeath:{
        type: String,
        required: true 
    },
    about:{
        type: String,
        required: true  
    },
    bio:{
        type: String,
        required: true 
    },
    additionalPhotos:[{
        type: String,
    }],
    additionalVideos:[{
        type: String,
    }],
    cemeteryName:{
        type: String,
    },
    cemeteryPlotNumber:{
        type: String,
    },
    cemeteryLocation:{
        type: String,
    },
    tribute:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Tribute",
    },
]

  });

  const UserModel = mongoose.model("User",UserSchema)

  module.exports = UserModel