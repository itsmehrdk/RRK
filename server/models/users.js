const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    fName:{
        type:String,
        require:true
    },
    lName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true

    }
})
const User=mongoose.model('User',userSchema)
module.exports=User