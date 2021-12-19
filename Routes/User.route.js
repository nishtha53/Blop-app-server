const express = require('express');
const { signup, signin, getUser, updateUser, deleteUser } = require('../controllers/User.controller');
const router = express.Router();

//signup
router.post('/signup',signup)
//signin
router.post('/signin',signin)
//getusers
router.get('/getuser/:id',getUser)
//updateuser
router.put('/updateUser/:id',updateUser)
//deleteuser
router.delete('/deleteUser/:id',deleteUser)

//export
module.exports = router;