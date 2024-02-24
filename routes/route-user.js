const express=require('express');
const router=express.Router();
const {getUser, signup,login}=require("../controllers/User")

router.route('').get(getUser).post(signup)
router.route('/login').post(login)

module.exports=router;