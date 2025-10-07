////////// WazApp Server ////////////
// Develop: Jasper Aga Camaña      // 
// Date Update: July 2024          //
// Project Deployed:               //
/////////////////////////////////////

const express = require("express");

const HttpStatusCode = require("./utils/httpStatusCode.js");
const { 
     loginUser,
    
} = require('./controllers/userController.js');
const {

  connectAppointment,
  generateLivekitToken
} = require('./controllers/appointmentController');

const dotenv = require('dotenv');
const mongoose = require("mongoose");
const AppError = require('./utils/appError.js');
//const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Set up Multer storage and file handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });


// configure env file location
dotenv.config({
    path: './.env'
})
// initialize express
const app = express();

app.use(express.static('public')); 
// inital json
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));

// => route properties
app.use((req, res, next) => {
    try {
        const route = req.path.substring(1); // remove leading "/"
        const parts = route.split('/').filter(Boolean); // clean array
        const baseRoute = parts.length > 0 ? parts[0] : '';
        
        app.locals.activeRoute = '/' + baseRoute;
        app.locals.viewingCategory = req.query.category;
    } catch (err) {
        console.warn('Error in activeRoute middleware:', err.message);
        app.locals.activeRoute = '/';
    }
    next();
});
  

app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));


///////////////// USERS /////////////////
// user login
app.post('/api/v1/login', loginUser); // done

///////////////// PATIENT /////////////////

///////////////// APPOINTMENT /////////////////
// Daily API
app.get('/api/v1/connectAppointment', connectAppointment);
// LiveKit API
app.post('/api/v1/generateLivekitToken',generateLivekitToken);

///////////////// NON LINK /////////////////

// check if API does not exist
app.all('/',(req,res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`, HttpStatusCode.NOT_FOUND));
});

// handling error middleware
app.use((err, req, res, next) =>{
    err.statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
});

// Setup the DB connection string 
const DB = process.env.MONGO_DB_CONNECTION.replace('<PASSWORD>', process.env.MONGO_DB_PASSWORD);
// connect to mongo DB
mongoose.connect(DB)
    .then(() => console.log('DB Connection successful!'))
    .catch(err=> console.log(err));

// initialize port
app.listen(process.env.DEFAULT_PORT, ()=>{
    console.log("Connected to server at 5000");
});