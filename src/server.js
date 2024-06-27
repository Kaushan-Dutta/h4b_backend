const express=require('express')
const mongoose=require('mongoose')
const http=require('http');
const cors=require('cors')

const app=express()
const server=http.createServer(app)

const {userExists}=require('./middleware/index');

require('dotenv').config()

app.use(express.json())
app.use(cors(
    {
        origin:'*'
    }

))
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
app.use('/api',require('./routes/auth'));
app.use('/api/admin',userExists,isAdmin,require('./routes/admin'));
app.use('/api/user',userExists,isUser,require('./routes/user'));

app.use('/api/placeorder',require('./routes/public'));

const PORT=process.env.PORT || 5000
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))