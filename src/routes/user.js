const express=require('express');
const router=express.Router();
const {createJourney,viewOrders}=require('../controllers/user');
const {journeyExists}=require('../middleware/index');
const {viewMeals}=require('../controllers/account');

const {contributeOrder}=require('../controllers/user');
const { createRating } = require('../controllers/rating');

const {contributeOrder,createOrder}=require('../controllers/user');


router.route('/order').get(journeyExists,viewOrders).post(journeyExists,createOrder);
router.route('/journey').post(createJourney);
router.route('/meal').get(viewMeals);
router.route('/contribute').post(contributeOrder);

router.route('/rating').post(createRating);

router.get('/isJourneyExist',journeyExists,(req,res)=>{
    return res.status(200).json({message:'Journey exists'});
});

module.exports=router;


