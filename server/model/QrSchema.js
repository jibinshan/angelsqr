const mongoose = require("mongoose")

const QRCodeSchema = new mongoose.Schema({
    qrId:{ 
        type: String, 
        required: true 
    },
    qrImage: { 
        type: String,
        required: true 
    }
  });

  const QrModel = mongoose.model("QrModel",QRCodeSchema)

  module.exports = QrModel