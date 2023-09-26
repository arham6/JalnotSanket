const mongoose=require('mongoose')

const ResultSchema=new mongoose.Schema({
    title:{
        type:String
    },
    image:{
        data: Buffer,
        contentType: String
    },
    description:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    result:{
        type:Number
    },
    time:{
        type: Date,
        default:Date.now
    }
})

const Result=mongoose.model('result',ResultSchema)
module.exports=Result