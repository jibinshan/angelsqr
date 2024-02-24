const jwt = require("jsonwebtoken")

const generatetockens = (userid)=>{
    return jwt.sign({_id:userid},"this_is_a_secret")
}

module.exports = {generatetockens}