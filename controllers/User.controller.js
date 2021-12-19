const User = require("../Models/User.model")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//gen token
const generateAuthToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString()}, "newuser");  //jwt.verify method is
    return token;
};

//finding user
const findByCredentials = async (email, password,res) => {
    const user = await User.findOne({ email });
    console.log(user)
    if(!user) {
        return res.status(404).json({ error: "Invalid user!"});
    }
    const isMatch = await bcrypt.compare(password, user.password); //comparing the password with the hashPassword
    if(!isMatch) {
        return res.status(404).json({ error: "Invalid user!" });
    }
    return user;
};

//signup
exports.signup = async (req,res) => {
    const { userName, email, password, profilePic } = req.body;
    console.log("body: ", req.body);
    try {
        const isUser = await User.findOne({ email });
        if(!email){
            return res.status(400).json({ error: "Validation Error"});
        }
        if(isUser) {
            return res.status(400).json({ error: "User already exists"});
        }
        const user = new User(req.body);
        console.log("user",user)
        const hashedPassword = await bcrypt.hash(user.password, 8);
        console.log("hashedPassword",hashedPassword)
        user.password = hashedPassword;
        await user.save();
        const token = await generateAuthToken(user);
        user.password = undefined;
        res.status(201).json({ user, token });
    } catch (error) {
        //return res.status(500).json({ error: "Something went wrong" });
        console.log(error);
    }
};

//signin
exports.signin = async (req,res, next) => {
    const { email, password } = req.body;
    try {
        const user = await findByCredentials(email, password,res);
        console.log(user);
        const token = await generateAuthToken(user);
        user.password = undefined;
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
        //console.log(error);
    }
};

//get user
exports.getUser = async(req,res) => {
    const _id = req.params.id;
    const data = req.body;
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } catch (err) {
        res.status(500).json(err);
      }
}

//delete user
exports.deleteUser = async(req,res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if(!user){
            res.status(404).json("user not exist",user);
        }
        res.status(200).json("User Deleted",user);
    } catch (error) {
        console.log("error",error);
    }
}

//update user
exports.updateUser = async(req,res) => {
    const _id = req.params.id;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            {_id},
            {$set:data}, 
            {new:true}
        );
        if(!user){
            res.status(404).json("User not found");
        }
        res.status(200).json("User Updated",user);
    } catch (error) {
        console.log("error", error);
    }
}