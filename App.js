const express=require('express');
const app=express()
const dotenv=require('dotenv').config()
const connectDB=require('./connect/connect')
const port=process.env.PORT;
const user=require('./routes/route-user')
const blog=require('./routes/route-blog')

app.use(express.json()); //convert to json

app.get('/',(req,res)=>{
        res.json('welcome')
})

app.use('/user',user) //end point to users
app.use('/blog',blog)

const start=async()=>{
        try{
                await connectDB(process.env.MONGO_CONNECTION);
                app.listen(port,(error)=>{
                        if(!error){
                                console.log('App running on ' + port);
                        }
                        else{
                                console.log(error)
                        }
                })
        }
        catch(err){
                console.log(err);
        }
}
start()

