const mongoose=require('mongoose')
require('dotenv').config()
const mongoURL=process.env.DB_URL  

const connectToMongo=async()=>{
    try{
        await mongoose.connect(mongoURL,{ useNewUrlParser: true , useUnifiedTopology:true})
        console.log('connected to db')
    }
    catch(error){
        console.log('error while connecting to database', error.message);
    }
}
module.exports=connectToMongo;
