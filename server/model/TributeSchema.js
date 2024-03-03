const mongoose = require("mongoose")

const TributeSchema = new mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    avatar: { 
        type: String,
        required: true 
    },
    comment:{
        type: String,
        required: true  
    },
    photos:{
        type: String,
    },
    Videos:{
        type: String,
    }

  });

  const TributeModel = mongoose.model("Tribute",TributeSchema)

  module.exports = TributeModel