const express = require("express")
const { generateQR, Qrcodes, ScanQr, QrwithId } = require("../controller/Qrcontroller")
const router = express.Router()

router.post("/generateQr",generateQR)
router.get("/",Qrcodes)
router.post("/scanQR",ScanQr);
router.get("/qrwithid/:qrid",QrwithId)
module.exports = router