async function getAllJobs (req, res){

    res.json({msg : "get all jobs"}) ;
}

async function getJob(req, res){

    res.json({msg : "get a job"}) ;
}

async function createJob (req, res){

    res.json({msg : "job created"}) ;
}

async function updateJob (req, res){

    res.json({msg : "job updated"}) ;
}

async function deleteJob (req, res){

    res.json({msg : "job deleted"}) ;
}


module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob} ;
