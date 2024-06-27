const express=require('express')
const mongoose=require('mongoose')
const http=require('http');
const cors=require('cors')
const Razorpay = require('razorpay');

const app=express()
const server=http.createServer(app)

const {userExists}=require('./src/middleware/index');

require('dotenv').config()

app.use(express.json())
app.use(cors({
    origin:true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.log(err))

app.get('/',(req,res)=>{
    return res.status(200).json({message:'Welcome to the server'})
})

const isAdmin=(req,res,next)=>{
    if(req.user.role==='admin'){
        return next();
    }
    return res.status(403).json({message:'Forbidden'});

}
const isUser=(req,res,next)=>{
    if(req.user.role==='user'){
        return next();
    }
    return res.status(403).json({message:'Forbidden'});

}
app.use('/api',require('./src/routes/auth'));
app.use('/api/admin',userExists,isAdmin,require('./src/routes/admin'));
app.use('/api/user',userExists,isUser,require('./src/routes/user'));

app.use('/api/placeorder',require('./src/routes/public'));

app.post("/payment/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_njkhQ67c5Bgwlt',
            key_secret: 'HNIdzDkYyFUeWgZaYatrgaiO',
        });

        const options = {
            amount: 20000, 
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT=process.env.PORT || 5000
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))