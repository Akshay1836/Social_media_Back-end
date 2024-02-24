const express=require('express');
const router=express.Router();
const {getblog,sendBlog, getOneBlog, updateOneBlog, deleteOneBlog}=require('../controllers/Blog')


router.route('').get(getblog).post(sendBlog);
router.route('/:id').get(getOneBlog).patch(updateOneBlog).delete(deleteOneBlog);


module.exports=router;