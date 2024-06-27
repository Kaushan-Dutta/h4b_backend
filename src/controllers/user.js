const {journeyModel}=require('../models/journey');
const {orderModel}=require('../models/order');

async function createJourney(req,res){
    try{
        const {pantryId,coach,seat,phone}=req.body;

        const journey=new journeyModel({pantryId,userId:req.user._id,coach,seat,phone});
        await journey.save();
        return res.status(201).json({message:'Journey created'});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
async function viewOrders(req,res){
    const {pantryId}=req.query;
    console.log(pantryId)
    try{
        const mealOrders=await orderModel.find({pantryId,email:req.user.email});
        return res.status(200).json({data:mealOrders});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports={createJourney,viewOrders};
