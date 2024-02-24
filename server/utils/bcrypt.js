const bcrypt = require("bcryptjs")

const generatepassword = (password)=>{
    return bcrypt.hash(password,10)
}

const comparepassword = (password,hashedpassword)=>{
    return bcrypt.compare(password,hashedpassword)
}

module.exports = {generatepassword,comparepassword}