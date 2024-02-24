const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
        name:{
                type:String,
                required:true
        },
        email:{
                type:String,
                required:true,
                unique:true
        },
        password:{
                type:String,
                required:true,
                minLength:[6,'Minimum length is 6']

        }
})

module.exports=mongoose.model('User',UserSchema);