const mongoose=require('mongoose');
const { v4: uuidv4 } = require('uuid');

const rating=new mongoose.Schema({
    pantryId:{
        type:String,
        ref:'PantryModel',
        required:true
    },
    rating :{
        type:Number,
        // ref:'HockerModel',
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

const ratingSchema=new mongoose.model('ratingSchema',rating);
module.exports={ratingSchema};