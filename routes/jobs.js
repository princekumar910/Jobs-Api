const express = require('express') ;
const route = express.Router(); 


const  {getAllJobs , getJob , createJob , updateJob , deleteJob}  = require('../controllers/jobs') ;

route.get('/getAllJobs' , getAllJobs) ;

route.get('/getJob' , getJob) ;

route.post('/createJob'  , createJob) ;

route.patch('/updateJob' , updateJob) ;

route.delete('/deleteJob' , deleteJob) ;



module.exports = route ;