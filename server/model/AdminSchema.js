const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    password:{ 
        type: String,
        required: true 
    }
  });

  const AdminModel = mongoose.model("AdminModel",AdminSchema)

  module.exports = AdminModel