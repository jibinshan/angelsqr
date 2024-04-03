const mongoose = require("mongoose")

const TributeSchema = new mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    // avatar: { 
    //     type: String, 
    // },
    date:{
       type:String,
    },
    comment:{
        type: String,  
    },
    email:{
       type:String
    },
    photos:{
        type: String,
    }
  });

  const TributeModel = mongoose.model("Tribute",TributeSchema)

  module.exports = TributeModel