const {Job} = require('../models/Job');
const { findByIdAndUpdate } = require('../models/User');

async function getAllJobs (req, res){
    const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt')

    res.json({msg : jobs}) ;
}

async function getJob(req, res){
  const {user : {userId} , params : {id : jobId} } = req ;
  
  const job = await Job.findById(jobId);

  if(!job){
    return res.json({msg : `There ia no Job with job id : ${jobId}`});
  }

    res.status(200).json({msg : job}) ;
}

async function createJob (req, res){
    const data = req.body ; 
    req.body.createdBy = req.user.userId ;
   const job = await Job.create(data);

    res.json({msg : req.body}) ;
}

// Update the job

async function updateJob (req, res){
  const {id : jobId} = req.params ;
 
  
   
    const job = await Job.findByIdAndUpdate(jobId , req.body , {new : true , runValidators : true} );
    if(!job){
     return res.json({msg : "No job exist with this id " })
    }
     res.json({msg : "job updated" ,  job}) ;
 
}

// delete Job
async function deleteJob (req, res){
 const {id : jobId} = req.params ;

 const job = await Job.findByIdAndDelete(jobId);
 if(!job){
  return res.json({msg : "Job doesn't exist"});
 }
    res.json({msg : "job deleted" , job}) ;
}


module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob} ;
