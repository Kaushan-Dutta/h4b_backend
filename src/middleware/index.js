const jwt = require('jsonwebtoken');
const {journeyModel}=require('../models/journey');
const {entityModel}=require('../models/entity');

const generateToken = (object) => {
    return jwt.sign(object, process.env.JWT_SECRET, { expiresIn: '24h' });
}
const verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}
const journeyExists=async (req,res,next)=>{
    const {pantryId}=req.query;
    console.log(pantryId)
    try{
        const journey=await journeyModel.find({pantryId,userId:req.user._id});
        console.log(journey)
        if(!journey || journey.length===0){
            return res.status(404).json({message:'Journey not found'});
        }
        next();
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
const userExists=async (req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    // console.log(token)
    try{
        const {_id}=verifyToken(token);
        // console.log(_id)
        const user=await entityModel.findById({_id});
        // console.log(user) 
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        req.user={_id:user._id,email:user.email,role:user.role};

        next(); 
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports={generateToken,verifyToken,journeyExists,userExists};