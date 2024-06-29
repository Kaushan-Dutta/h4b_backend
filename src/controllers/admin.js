const {pantryModel,mealModel,hockerModel}=require('../models/pantry');
const {contributeModel}=require('../models/contribute');
const {orderModel}=require('../models/order')

async function addPantry(req,res){
    try{
        const {trainName,departure,arrival}=req.body;
        
        const pantry=new pantryModel({trainName,departure,arrival});
        await pantry.save();
        return res.status(201).json({message:'Pantry added'});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
async function addMeal(req,res){
    try{
        const {mealName,mealType,mealPrice}=req.body;
        console.log(req.body)
        const meal=new mealModel({mealName,mealType,mealPrice});
        await meal.save();
        return res.status(201).json({message:'Meal added'});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function addHocker(req,res){
    try{
        const {hockerName,pantryId}=req.body;
        const hocker=new hockerModel({hockerName,pantryId});
        await hocker.save();
        return res.status(201).json({message:'Hocker added'});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function viewPantry(req,res){
    const {pantryId}=req.query;
    // console.log(typeof(pantryId));
    try{
        if(!pantryId){
            return res.status(200).json({data:await pantryModel.find()});
        }
        else{
            const hocker=await hockerModel.find({pantryId});
            console.log(hocker);
            return res.status(200).json({data:hocker});
        }
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
async function viewContribute(req,res){
    const {pantryId}=req.query;
    let view,orders;
    try{
        if(pantryId){
            view=await contributeModel.find({
            pantryId
        })}
        else{
            view=await contributeModel.find();
            orders=await orderModel.find({
                _id:view.orderId
            });
        }
        return res.status(200).json({data: {view,orders}})
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
async function viewOrders(req,res){
    try{
        const orders=await orderModel.find({
            
        });
        return res.status(200).json({data:orders})
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}


module.exports={addPantry,addMeal,addHocker,viewPantry,viewContribute,viewOrders};
