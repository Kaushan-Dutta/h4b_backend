const mongoose=require('mongoose');

const journeySchema=new mongoose.Schema({
    pantryId:{
        type:String,
        ref:'PantryModel',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'EntityModel',
        required:true
    },
    coach:{
        type:String,
        required:true
    },
    seat:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },    
},{timestamps:true
})
const journeyModel=new mongoose.model('JourneyModel',journeySchema);
module.exports={journeyModel};