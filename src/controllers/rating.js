const {ratingSchema}=require('../models/Rating');


async function createRating(req,res){
    try{
        const {pantryId,rating,review}=req.body;

        const pantryRating=new ratingSchema({pantryId,rating,review});
        await pantryRating.save();
        return res.status(201).json({message:'Rating created'});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports={createRating};






