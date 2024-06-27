const express=require('express');
const {accountLogin,accountSignup}=require('../controllers/auth');
const { userExists } = require('../middleware');

const router=express.Router();

router.get('/curuser',userExists,(req,res)=>{
    return res.status(200).json({user:req.user})
});

router.route('/auth/login').post(accountLogin);
router.route('/auth/signup').post(accountSignup);

module.exports=router;