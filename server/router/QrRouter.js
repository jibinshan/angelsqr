const express = require("express")
const { generateQR, Qrcodes } = require("../controller/Qrcontroller")
const router = express.Router()

router.post("/generateQr",generateQR)
router.get("/",Qrcodes)

module.exports = router