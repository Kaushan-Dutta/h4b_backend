const {ratingSchema} = require('../models/Rating');
async function getRatings(req,res){
    try{
        const ratings=await ratingSchema.find();
        console.log(ratings);
        return res.status(200).json({data:ratings});
        
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports={getRatings};