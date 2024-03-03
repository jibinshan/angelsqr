const mongoose = require("mongoose")

const QRCodeSchema = new mongoose.Schema({
    qrId:{ 
        type: String, 
        required: true 
    },
    qrImage: { 
        type: String,
        required: true 
    },
    rejistered:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  });

  const QrModel = mongoose.model("QrModel",QRCodeSchema)

  module.exports = QrModel