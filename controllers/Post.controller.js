const User = require("../Models/User.model")
const Post = require("../Models/Post.model")


//create post
exports.addPost = (req,res) =>{
    const {title,desc,photo,username,categories} = req.body;
    const post = new Post({
        title:title,
        desc,
        photo,
        username,
        categories
    });
    post.save(((error, post) => {
        if(error) return res.status(400).json({ error });  
        if(post){
            res.status(201).json({ post });
        }
    }));
}

//update post


//delete post


//get post by id


//get all posts