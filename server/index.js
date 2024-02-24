const express = require("express")
const cors = require("cors")
const connectDB = require("./config/config")
const cloudinaryware = require("./cloudinary/cloudinary")
const QrRoute = require("./router/QrRouter")
const admin = require("./router/AdminRouter")

const app = express()

app.use(express.json())
app.use(cors())
app.use(cloudinaryware)
connectDB()

require("dotenv").config()

app.use("/qrcodes",QrRoute)
app.use("/admin",admin)


app.listen(1999,console.log("app is running on port no.1999"))