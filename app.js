require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const {auth} = require('./middleware/authentication')
// routes 
const authRoute = require('./routes/auth');
const jobRoute = require('./routes/jobs') ;

// security packages
const helmet = require('helmet') ;
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra packages
app.set('trust proxy' , 1) ;
app.use(express.json());
app.use(cors);
app.use(xss);
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}));
app.use(helmet);

// routes

app.use('/api/v1/auth' , authRoute) ;
app.use('/api/v1/job' , auth ,jobRoute) ;
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) ;
    console.log("connected to database");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
