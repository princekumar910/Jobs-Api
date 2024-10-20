const User = require('../models/User') ;
const jwt = require('jsonwebtoken') ;
const {unauthenticatedError} = require('../errors');



const auth = (req ,res , next)=>{
    // check header 

    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new unauthenticatedError('Authenticaton Invalid')
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET) ;
        // attach the use to the job routes
        req.user = {userId : payload.userId , name : payload.userName }
        next() ; 
    } catch (error) {
           throw new unauthenticatedError('Authentication invalid')
    }

}


module.exports = {auth}