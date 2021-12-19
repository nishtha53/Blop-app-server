const express = require('express');
const { addPost } = require('../controllers/Post.controller');
const router = express.Router();

//create post 
router.post('/addpost',addPost)

module.exports = router;

