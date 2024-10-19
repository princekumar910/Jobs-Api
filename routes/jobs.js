const express = require('express') ;
const route = express.Router(); 


const  {getAllJobs , getJob , createJob , updateJob , deleteJob}  = require('../controllers/jobs') ;

route.get('/getAllJobs' , getAllJobs) ;

route.get('/getJob/:id' , getJob) ;

route.post('/createJob'  , createJob) ;

route.patch('/updateJob/:id' , updateJob) ;

route.delete('/deleteJob/:id' , deleteJob) ;



module.exports = route ;