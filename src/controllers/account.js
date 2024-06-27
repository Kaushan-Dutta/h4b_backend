const {mealModel} = require('../models/pantry');
async function viewMeals(req,res){
    try{
        const meals=await mealModel.find();
        console.log(meals);
        return res.status(200).json({data:meals});
        
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports={viewMeals};