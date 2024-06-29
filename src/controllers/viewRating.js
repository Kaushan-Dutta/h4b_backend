const {ratingModel} = require('../models/Rating');
async function viewRatings(req,res){
    try{
        const ratings=await ratingModel.find();
        console.log(ratings);
        return res.status(200).json({data:ratings});
        
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports={viewRatings};