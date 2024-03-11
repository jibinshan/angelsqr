const mongoose = require("mongoose")
const qrcode = require("qrcode") 
const QrModel = require("../model/QrSchema")
const generateQR = async(req,res)=>{
    try {
        const {numberofqr} = req.body
        const qrcodes = []
        for (let i =0 ; i < numberofqr ;i++) {
            const qrId = new mongoose.Types.ObjectId().toString()
            const qrurl = `https://angelsqr.vercel.app/scanqr/${qrId}`
            const qrImage = await qrcode.toDataURL(qrurl)
            qrcodes.push({qrId,qrImage})
            await QrModel.create({qrId,qrImage})
        }   
         return res.status(200).json(qrcodes)
    } catch (error) {
        console.log(error,"===generateqr");
        return res.status(401).json(error)

    }
}

const Qrcodes = async(req,res)=>{
    try {
       const qrcodes = await QrModel.find()
       return res.status(200).json(qrcodes)
    } catch (error) {
        return res.status(401).json(error.message)
    }
}
const ScanQr =  async (req, res) => {
    try {
        const qrId = req.body.qrId || req.query.qrId; // Extract qrId from the request body
        console.log(qrId,";;;;;;");
        // Call the scanQR function to simulate scanning the QR code
  
        // Check if there are registered users with this QR code
        const qrexist = await QrModel.findOne({ qrId:qrId});
        console.log(qrexist,"llllllllllllllllllll");
        if (qrexist && qrexist.rejistered) {
            // If there are registered users, redirect to the bio page of the first registered user
            return res.status(200).json(`/bio/${qrId}`);
        } else {
            // If there are no registered users, redirect to create user page
            return res.status(200).json(`/createuser/${qrId}`);
        }
    } catch (error) {
        // If an error occurs during scanning or redirection, send an error response
        console.error(error);
        return res.status(400).json("Internal server error");
    }
  }
  const QrwithId = async(req,res)=>{
    try {
        const qrid = req.params.qrid
        const specificQr =await QrModel.findOne({qrId:qrid}).populate({
            path:"rejistered",
            model:"User",
            populate:{
              path:"tribute",
              model:"Tribute",
              }
        })
        return res.status(200).json(specificQr)
    } catch (error) {
        return res.status(400).json(error)
    }
  }
module.exports = {generateQR,Qrcodes,ScanQr,QrwithId}
