const { required } = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : [true , "Please Provide Name"],
        minlength : 3,
        maxlength : 30 ,
    },
    email : {
        type : String ,
        required : [true , "Please Provide Email"],
       match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "Please Provide valid email"] ,
       unique : [true , "Email already Exist"] ,

    },
    password : {
        type : String ,
        required : [true , "Please Provide password"], 
        minlength : 6,
    },
     
})

// never use arrow function beacuse it doesn't give access of this.
userSchema.pre('save' , async function(next){
         const salt = await bcrypt.genSalt(10) ;
         this.password =await bcrypt.hash(this.password , salt);
         next() ;

})

// instance method of schema

userSchema.methods.createJWT = function(){
    return jwt.sign({userId : this._id , userName : this.name} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_LIFETIME})
}


userSchema.methods.comparePassword = async function(candidatePassword ){

    const isMatch = await bcrypt.compare(candidatePassword , this.password) ; 
    return isMatch ;

}
module.exports = mongoose.model('User' , userSchema) ;