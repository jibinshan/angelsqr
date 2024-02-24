const mongoose = require("mongoose")
const AdminModel = require("../model/AdminSchema")
const { generatepassword, comparepassword } = require("../utils/bcrypt")
const { generatetockens } = require("../utils/jwt")


const signup = async (req,res)=>{
    try {
        const {name,password} = req.body
         const nameexist = await AdminModel.findOne({name})
         if (nameexist) {
           return res.status(401).json("name is already exist")
         }
         const hashedpassword = await generatepassword(password)
        await AdminModel.create({
            name,
            password : hashedpassword
        })
        return res.status(200).json("account created succesfully")
    } catch (error) {
        return res.status(401).json(error.message)
    }
}

const login = async (req,res)=>{
    try {
        const {name,password} = req.body

        const nameexist = await AdminModel.findOne({name})
        if (!nameexist) {
            return res.status(401).json("username is invalid")
        }
        const validpass = await comparepassword(password,nameexist.password)
        if (!validpass) {
            return res.status(401).json("password is invalid")
        }
        const accesstocken = await generatetockens(nameexist._id)
        return res.status(200).json({name,accesstocken})
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const changepassword = async (req,res)=>{
    try {
        const {name,password} = req.body
        const nameexist = await AdminModel.findOne({name})
        const hashedpassword = await generatepassword(password)
        if (nameexist) {
            await nameexist.updateOne({password:hashedpassword})
            return res.status(200).json("changed password succesfully")
        }
        return res.status(401).json("invalid username")
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {signup,login,changepassword}