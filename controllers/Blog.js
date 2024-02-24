const Blog = require("../model/Blog_schema");

const getblog = async (req, res) => {
  try {
    const users = await Blog.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
  }
};

const sendBlog = async (req, res) => {
  
  try {
    if (req.body.title) {
      const data = await Blog.create(req.body);
      res.status(200).json({ success: true, data: data });
    }
    console.log(result);
    res.status(404).json("Resource not found");
  } catch (error) {
    console.log("error occured");
    res.status(500).json("internal error");
  }
};

const getOneBlog=async(req,res)=>{
  const {id:BlogID}=req.params
  try{
    const data=await Blog.findOne({_id:BlogID});
    console.log(data);
    if(!data){
      res.status(400).json('Resource not found');
    }
    res.status(200).json({success:true,data:data})
  }catch(error){
    res.status(500).json('Internal error')
  }
}

const updateOneBlog=async(req,res)=>{
  const {id:BlogID}=req.params
  try{
    const data=await Blog.findOneAndUpdate({_id:BlogID},req.body,{new:true,runValidators:true});
    if(!data){
      res.status(400).json('Resource not found');
    }
    res.status(200).json({success:true,data:data})
  }catch(error){
    res.status(500).json('Internal error')
  }
}

const deleteOneBlog=async(req,res)=>{
  const {id:BlogID}=req.params
  try{
    const data=await Blog.findOneAndDelete({_id:BlogID});
    if(!data){
      res.status(400).json('Resource not found');
    }
    res.status(200).json({success:true,data:"data deleted"})
  }catch(error){
    res.status(500).json('Internal error')
  }
}

module.exports = { getblog, sendBlog,getOneBlog,updateOneBlog,deleteOneBlog};
