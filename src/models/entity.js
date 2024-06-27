const mongoose=require('mongoose');
const md5=require('md5');

function checkValid(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
    return regex.test(password);
}

const entitySchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
        required:true
    }
},{timestamps:true})

entitySchema.pre('save',function(next){
    if(this.password.length>8 && checkValid(this.password)  ){
        this.password=md5(this.password);
    }
    next();
})

const entityModel=new mongoose.model('EntityModel',entitySchema);
module.exports={entityModel};