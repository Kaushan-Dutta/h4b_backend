const express = require("express");
const router = express.Router();
const { orderModel } = require("../models/order");
const { mealModel,hockerModel,pantryModel } = require("../models/pantry");

router.post("/", async function placeOrder(req, res) {
  try {
    const { pantryId, hockerId, email, mealId, quantity, totalPrice } =
      req.body;
    const placeOrder = new orderModel({
      pantryId,
      hockerId,
      email,
      mealId,
      quantity,
      totalPrice,
    });
    await placeOrder.save();
    return res.status(201).json({ message: "Order placed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
router.get('/',async(req,res)=>{
    const {hockerId}=req.query; 
    try{
        const hocker=await hockerModel.findById({_id:hockerId});
        if(!hocker){
            return res.status(404).json({message:'Hocker not found'});
        }
        const pantry=await pantryModel.findById({_id:hocker.pantryId});
        if(!pantry){
            return res.status(404).json({message:'Pantry not found'});
        }
        const meals=await mealModel.find();
        return res.status(200).json({hocker,pantry,meals});      
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
});
router.get("/", async (req, res) => {
  try {
    const meals = await mealModel.find();
    console.log(meals);
    return res.status(200).json({ data: meals });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
module.exports = router;
