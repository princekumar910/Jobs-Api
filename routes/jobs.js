const express = require('express') ;
const route = express.Router(); 

const {auth} = require('../middleware/authentication')
const  {getAllJobs , getJob , createJob , updateJob , deleteJob}  = require('../controllers/jobs') ;

// either we add single in all or which we want or we use in app.js which run for all job routes

route.get('/getAllJobs' , getAllJobs) ;

route.get('/getJob/:id' , getJob) ;

route.post('/createJob'  , createJob) ;

route.patch('/updateJob/:id' , updateJob) ;

route.delete('/deleteJob/:id' , deleteJob) ;



module.exports = route ;