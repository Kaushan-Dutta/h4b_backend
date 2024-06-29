const mongoose=require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:()=>{
            return 'OD' + parseInt(Math.random() * 100000)}
    },
    pantryId:{
        type:String,
        ref:'PantryModel',
        required:true
    },
    hockerId:{
        type:String,
        ref:'HockerModel',
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mealId:{
        type:String,
        ref:'MealModel',
        required:true
    },
    mealName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'completed'
    }
},{timestamps:true
})

const orderModel=new mongoose.model('OrderModel',orderSchema);
module.exports={orderModel};