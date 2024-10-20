const User = require('../models/User');
const jwt = require('jsonwebtoken')

async function register(req, res) {

    const data = req.body ;

    const user = await User.create(data);
    // we define JWT method in user model as user is instances of user model so it has acces of user model
    const token = user.createJWT()    
                                      

    

    res.json({ msg: "Token Created", user :{name : user.name} , token })
}

async function login(req, res) {
 const {email , password} = req.body ;

 if(!email || !password){
    return res.json({msg : "Please Provide email and password"}) ;
 }

 const user = await User.findOne({email});

 // if user not exist then create one
 if(!user){
     return res.json({msg : "Invalid Crendentials"})
    }
    
    //comapre Password 
 const isPasswordCorrect = await user.comparePassword(password) ;

 if(!isPasswordCorrect){
    return res.json({msg : "Invalid Crendentials"})
 }
    const token = user.createJWT();
    res.status(200).json({user : {name : user.name} , token})

}



module.exports = { login, register };
