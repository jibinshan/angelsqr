const mongoose = require("mongoose")
const qrcode = require("qrcode") 
const QrModel = require("../model/QrSchema")
const generateQR = async(req,res)=>{
    try {
        const {numberofqr} = req.body

        for (let i =0 ; i < numberofqr ;i++) {
            const qrId =`http://localhost:1999/admin/login/${new mongoose.Types.ObjectId().toString()}`
            const qrImage = await qrcode.toDataURL(qrId)
            await QrModel.create({qrId,qrImage})
        }
        const qrcodes = await QrModel.find()
        
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

module.exports = {generateQR,Qrcodes}