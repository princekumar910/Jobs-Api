const { required } = require("joi");

const mongoose = require('mongoose') ;

const jobSchema = new mongoose.Schema({

    company : {
        type : String ,
        required : [true , "Please Provide Company Name"],
        maxlength : 50 
    },
    position : {
        type : String ,
        required : [true , "Please Provide Position Name"]
    },
    MinSalary : {
        type : String, 
        required : [true , "Please Provide Salary"]
    },
    status : {
        type : String ,
        enum : ['interview' , 'declined' , 'pending'] ,
        default : 'pending'
    },
    createdBy:{
        type : mongoose.Types.ObjectId ,
        ref : 'User',
        required : [true , "please provide user"]
    }
},{timestamps : true}) ;





const Job = mongoose.model('Job' , jobSchema) ;
module . exports = {Job} ;