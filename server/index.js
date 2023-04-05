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
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
  
    // TODO: Validate email address
  
    // Generate a password reset token (e.g. using JWT)
  
    // Send the password reset email
    try {
      const transporter = nodemailer.createTransport({
        // Replace with your SMTP server settings
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
          email: "your_email",
          pass: "your_password",
        },
      });
  
      const mailOptions = {
        from: "noreply@example.com",
        to: email,
        subject: "Reset Your Password",
        html: `
          <p>Hi there,</p>
          <p>Please click the following link to reset your password:</p>
          <p><a href="https://yourwebsite.com/reset-password?token=${resetToken}">Reset Password</a></p>
          <p>If you didn't request a password reset, please ignore this email.</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        message: `An email with instructions to reset your password has been sent to ${email}.`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  });
app.post('/payment', async (req, res) => {
    try {
      const { amount, token } = req.body;
      const charge = await stripe.charges.create({
        amount: amount,
        currency: 'USD',
        description: 'Payment for Product',
        source: token.id,
      });
      res.status(200).json({ success: true, charge });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    }
  });
app.listen(3001,()=>{
    console.log('server running on port no 3000')

})
