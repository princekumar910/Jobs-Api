async function login (req , res){
    res.json({msg  : "user login"})
}

async function register (req , res){
    res.json({msg  : "user Reister"})
}

module.exports = {login , register} ;
