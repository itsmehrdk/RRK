const express=require('express')
const mongoose=require('mongoose')
const bcrypt =require('bcrypt')
const app=express()
const cors=require('cors')
app.use(cors())
// const jwt  =require('jwt')
const bodyparser=require('body-parser')
const urluncodedeParser=bodyparser.urlencoded({extended:false})
app.use(bodyparser.json(),urluncodedeParser)
const User=require('./models/users')
const generateAuthToken = require('./jwToken')
// const jwt=require('jwt')

mongoose.set('strictQuery' , true)
mongoose.connect('mongodb://127.0.0.1:27017/sam').then((res)=>{
    console.log('data base connected')

}).catch((err)=>{
    console.log(err,"errrr")

})

app.get('/',(req,res)=>{
    res.send('hello from server')
})
app.post('/register',async(req,res)=>{
    const user=req.body
    console.log(req.body,"dhruv")
    const  Email=await User.findOne({email:user.email})
    if(Email){
        res.send('user is already register in  our dataBase')
    } 
    else{
        console.log(req.body.pass,"rrr")
            user.pass= await bcrypt.hash(req.body.pass,10)
            console.log(req.body.pass,"rrr")
            const dbUser=new User({
                fName:user.fName,
                lName:user.lName,
                email:user.email.toLowerCase(),
                pass:user.pass


            })
             await dbUser.save()
            res.json({messge:"done"})

    }

})
// login api

app.post('/login', async(req,res)=>{
    const userInfo=req.body
    console.log(userInfo,"ppp")
    var userData
    try{
         userData= await User.findOne({email:userInfo.email});
         console.log(userData,"pass")

    }
    catch(err){
        console.log(err,"err while matching email in database");
        

    }

    if(!userData){
        return res.status(401).send({message:"Invalid Email or pass", success:false})
    }
    const validPass=await bcrypt.compare(userInfo.pass,userData.pass).catch((err)=>{
        console.log(err,"err while hashin");
        res.status(500).send({message:"Internal server err"})

    });
    if(!validPass){
        return res.status(401).send({message:"Invalid email pass"})
    }
    let userDataObject=userData.toObject()

    delete userDataObject.pass
    console.log(userData,'users')
    const token=generateAuthToken(userData);
    return res.status(200).send({
        
        data:{token:token, userData:userDataObject},
    
        message:"Loggged in successfully",
        success:true,
    })
})
app.listen(3001,()=>{
    console.log('server running on port no 3000')

})