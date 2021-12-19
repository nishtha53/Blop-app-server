const User = require("../models/user");
const jwt = require("jsonwebtoken");

//authentication for protected routes
exports.auth = async (req, res, next) => {
    //middleware function
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "newuser");
        const user = await User.findOne({ _id: decoded._id });
        if(!user) {
            res.status(401).json({
                error: "Please authenticate!",
            });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong!",
            
        });
    }
};

exports.userMiddleware = async(req,res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "newuser");
    const user = await User.findOne({ _id: decoded._id });
    if(user.userType !== 'admin'){
        return res.status(400).json({ message: "User Access Denied" });
    }
    next();
}