const mongoose=require('mongoose');
const { v4: uuidv4 } = require('uuid');

const pantrySchema=new mongoose.Schema({
    _id:{
        type:String,
        default:()=>{
            return 'PN' + parseInt(Math.random() * 100000)}
    },
    trainName:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    arrival:{
        type:String,
        required:true
    }    
})
pantrySchema.pre('save',async function(next){
    this.departure=this.departure.toUpperCase();
    this.arrival=this.arrival.toUpperCase();
    this.trainName=this.trainName.toUpperCase();
    const train=await pantryModel.findOne({trainName:this.trainName});
    if(train){
        throw new Error('Train already exists');
    }
    next();
})
const mealSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:()=>{
            return 'ML' + parseInt(Math.random() * 100000)}
    },
    mealName:{
        type:String,
        required:true
    },
    mealType:{
        type:String,
        required:true
    },
    mealPrice:{
        type:Number,
        required:true
    }
})

const hockerSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:()=>{
            return 'HC' + parseInt(Math.random() * 100000)}
    },
    hockerName:{
        type:String,
        required:true
    },
    pantryId:{
        type:String,
        ref:'PantryModel',
    }
})

const pantryModel=new mongoose.model('PantryModel',pantrySchema);
const mealModel=new mongoose.model('MealModel',mealSchema);
const hockerModel=new mongoose.model('HockerModel',hockerSchema);

module.exports={pantryModel,mealModel,hockerModel};