const express = require("express")
const { signup, login, changepassword } = require("../controller/Admincontroller")

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/changepassword",changepassword)

module.exports = router