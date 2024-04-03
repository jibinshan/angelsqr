const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{ 
        type: String, 
        required: true 
    },
    profilePhoto: { 
        type: String,
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
    coverImage:{
        type: String,
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
    Vadditionaldetails:{
        type: String,
    },
    Vdate:{
        type: String,
    },
    Vstarttime:{
        type: String,
    },
    Vendtime:{
        type: String,
    },
    Vlocation:{
        type: String,
    },
    Fsadditionaldetails:{
        type: String,
    },
    Fsdate:{
        type: String,
    },
    Fsstarttime:{
        type: String,
    },
    Fsendtime:{
        type: String,
    },
    Fslocation:{
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