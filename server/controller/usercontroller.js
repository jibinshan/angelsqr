const user = require("../model/UserSchema")

const getuser = async(req,res)=>{
    try {
        const userName = req.params.userName;
        const User = await user.findOne({ name: userName });

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(User);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {getuser}