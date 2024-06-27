const express=require('express');
const router=express.Router();
const {addPantry,addMeal,addHocker,viewPantry}=require('../controllers/admin');
const {viewMeals}=require('../controllers/account');

router.route('/pantry').get(viewPantry).post(addPantry);
router.route('/hocker').post(addHocker);

router.route('/meal').get(viewMeals).post(addMeal);

module.exports=router;


