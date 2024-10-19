const { required } = require('joi');
const mongoose = require('mongoose');

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
       unique : true ,

    },
    password : {
        type : String ,
        required : [true , "Please Provide password"],
        select : false , 
        minlength : 6,
    },
     
})



module.exports = mongoose.model('User' , userSchema) ;